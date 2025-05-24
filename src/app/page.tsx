"use client"; // Client Componentとしてマーク

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image"; // Next.jsのImage最適化
import Link from "next/link"; // Next.jsのLinkコンponent
import {
    FaRobot,
    FaGamepad,
    FaChalkboardTeacher,
    FaMicrophoneAlt,
    FaComments,
    FaBookOpen,
    FaPenAlt,
    FaShieldAlt,
    FaExternalLinkAlt,
    FaChartLine,
    FaEnvelope,
    FaTwitter,
    FaLinkedin,
    FaFacebook,
    FaYoutube,
    FaInstagram,
    FaStar,
} from "react-icons/fa"; // React Icons
import { TbMessageDots } from "react-icons/tb"; // AI英会話アイコン
import { MdOutlineDashboard } from "react-icons/md"; // 保護者管理画面アイコン
import { AiOutlineTrophy, AiOutlineTeam } from "react-icons/ai"; // コンペ、共有アイコン
import { RiFileList2Line } from "react-icons/ri"; // TODOリストアイコン

// 仮の画像パス（実際はプロジェクトのpublicディレクトリなどに配置し、適切なパスに修正してください）
const HERO_IMAGE = "/images/hero-main.png";
const SYSTEM_ARCHITECTURE_ILLUSTRATION = "/images/system-architecture.png"; // AI_AVATAR_ILLUSTRATIONを置き換え
const MOCKUP_CONTENT_CREATION = "/images/mockup-content-creation.png";
// const MOCKUP_AI_CONVERSATION = "/images/mockup-ai-conversation.png";
// const MOCKUP_ESSAY_CORRECTION = "/images/mockup-essay-correction.png";
// const MOCKUP_MINI_GAME = "/images/mockup-mini-game.png";
// const MOCKUP_VOCABULARY = "/images/mockup-vocabulary.png";
// const MOCKUP_QA = "/images/mockup-qa.png";
const MOCKUP_PROGRESS_DASHBOARD = "/images/mockup-progress-dashboard.png";
const BACKGROUND_GRADIENT = "/images/background-gradient.svg"; // 仮の背景SVG
const FUTURE_VISION_IMAGE = "/images/future-vision.png"; // 未来のビジョンを示す新しい画像

// CSSはTailwind CSSのクラス名を直接付与する想定です。
// グローバルCSSに以下の設定を追加することを想定しています:
// @import 'tailwindcss/base';
// @import 'tailwindcss/components';
// @import 'tailwindcss/utilities';
// html { scroll-behavior: smooth; }

interface FeatureItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
    icon,
    title,
    description,
    delay = 0,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-700 ease-out ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="text-4xl text-blue-600 mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

interface TestimonialCardProps {
    quote: string;
    author: string;
    title: string;
    stars: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    quote,
    author,
    title,
    stars,
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-full transition-transform duration-300 hover:scale-[1.02]">
            <div>
                <div className="flex justify-center mb-3 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={i < stars ? "" : "text-gray-300"}
                        />
                    ))}
                </div>
                <p className="text-gray-700 italic mb-4">{quote}</p>
            </div>
            <div className="text-right">
                <p className="font-semibold text-gray-800">- {author}</p>
                <p className="text-sm text-gray-500">{title}</p>
            </div>
        </div>
    );
};

const pricingPlans = [
    {
        name: "Free Plan",
        price: "¥0",
        frequency: "forever",
        features: [
            "基本学習コンテンツ（一部制限）",
            "AI問題自動生成（回数制限あり）",
            "英単語・イディオム学習（一部制限）",
            "ミニゲーム（一部制限）",
            "学習進捗管理",
        ],
        buttonText: "無料で始める",
        buttonLink: "#",
    },
    {
        name: "Premium Plan",
        price: "¥1,980",
        frequency: "per month",
        highlight: true,
        features: [
            "<b>全ての基本学習コンテンツ</b>",
            "<b>AI問題自動生成 無制限</b>",
            "<b>AI英会話（ガイド/ダイナミック）</b>",
            "<b>英文添削機能</b>",
            "<b>発音矯正機能</b>",
            "全ての英単語・イディオムアクティビティ",
            "全てのミニゲーム",
            "TL（学習記録集積）機能",
            "オリジナルコンテンツ共有機能",
            "優先サポート",
        ],
        buttonText: "今すぐアップグレード",
        buttonLink: "#",
    },
    {
        name: "Family Plan",
        price: "¥3,480",
        frequency: "per month",
        features: [
            "Premium Planの全機能",
            "<b>最大3アカウントまで利用可能</b>",
            "<b>保護者向け管理画面</b>",
            "家族間での学習状況共有",
            "家族限定イベントへの参加",
        ],
        buttonText: "家族で始める",
        buttonLink: "#",
    },
];

const LPPage: React.FC = () => {
    const refs = useRef<Record<string, HTMLElement | null>>({});

    const scrollToSection = useCallback((id: string) => {
        const element = refs.current[id];
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    // スクロール時のアニメーション制御（Intersection Observerの汎用的な適用例）
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up"); // クラスを付与してアニメーションを開始
                        observer.unobserve(entry.target); // 一度アニメーションしたら監視を解除
                    }
                });
            },
            { threshold: 0.2 } // 20%が見えたら発火
        );

        document.querySelectorAll(".animate-on-scroll").forEach((el) => {
            observer.observe(el);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    // ダミーのパーティクルアニメーション（CSSやJSライブラリで実装することを想定）
    const renderParticles = () => (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-blue-300 rounded-full opacity-50 animate-particle"
                    style={{
                        width: `${Math.random() * 5 + 2}px`,
                        height: `${Math.random() * 5 + 2}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${Math.random() * 10 + 5}s`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                />
            ))}
        </div>
    );

    return (
        <div className="font-sans text-gray-900 antialiased bg-gray-50">
            {/* ナビゲーションバー */}
            <header className="sticky top-0 z-50 bg-white shadow-md py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link
                        href="/"
                        className="text-2xl font-extrabold text-blue-700 hover:text-blue-800 transition-colors"
                    >
                        Hi, English!
                    </Link>
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <button
                                    onClick={() => scrollToSection("features")}
                                    className="text-gray-600 hover:text-blue-700 transition-colors font-medium"
                                >
                                    機能
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() =>
                                        scrollToSection("our-mission")
                                    }
                                    className="text-gray-600 hover:text-blue-700 transition-colors font-medium"
                                >
                                    Hi, English!の想い
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("why-us")}
                                    className="text-gray-600 hover:text-blue-700 transition-colors font-medium"
                                >
                                    選ばれる理由
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("pricing")}
                                    className="text-gray-600 hover:text-blue-700 transition-colors font-medium"
                                >
                                    料金
                                </button>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md transform hover:scale-105"
                                >
                                    無料で始める
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                {/* ヒーローセクション */}
                <section
                    id="hero"
                    ref={(el) => {
                        refs.current.hero = el;
                    }}
                    className="relative bg-gradient-to-br from-blue-50 to-blue-200 py-20 md:py-32 overflow-hidden"
                    style={{
                        backgroundImage: `url(${BACKGROUND_GRADIENT})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {renderParticles()} {/* 背景パーティクル */}
                    <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between">
                        <div className="text-center md:text-left md:w-1/2 mb-10 md:mb-0 animate-fade-in-up">
                            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-blue-900 drop-shadow-md">
                                「英語ができる！」
                                <br />
                                をあなたに。
                                <br />
                                <span className="text-blue-600">
                                    挫折しない、本物の英語学習プラットフォーム
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-700 mb-8">
                                単なる知識ではなく、
                                <b>
                                    <span className="text-blue-700">
                                        「使える英語」
                                    </span>
                                </b>
                                を確実に習得できる、 細部まで洗練され尽くした
                                <b>
                                    <span className="text-purple-700">
                                        高機能学習システム
                                    </span>
                                </b>
                                。<br />
                                このサービスは、選んでくださる全てのお客様の
                                <span className="font-bold text-green-700">
                                    日常を豊かにする贈り物
                                </span>
                                です。
                                <br />
                                もう迷わない、もう挫折しない、
                                <span className="font-bold text-blue-700">
                                    新しい「続く」学習体験
                                </span>
                                を始めましょう。
                            </p>
                            <div className="flex justify-center md:justify-start space-x-4">
                                <Link
                                    href="#"
                                    className="bg-blue-600 text-white text-xl px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                                >
                                    無料で体験してみる
                                </Link>
                                <Link
                                    href="#our-mission"
                                    className="bg-white text-blue-600 text-xl px-8 py-4 rounded-full font-bold shadow-lg border-2 border-blue-600 hover:bg-blue-50 transition-all transform hover:scale-105"
                                >
                                    Hi, English! の想い
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center animate-fade-in-up animate-delay-300">
                            <Image
                                src={HERO_IMAGE}
                                alt="Hi, English! Learning Platform"
                                width={700}
                                height={500}
                                priority
                                className="max-w-full h-auto shadow-2xl rounded-lg transform rotate-3 hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </section>

                {/* --- */}
                {/* なぜHi, English!を選ぶと良いのか？ */}
                <section
                    id="our-mission"
                    ref={(el) => {
                        refs.current["our-mission"] = el;
                    }}
                    className="py-20 bg-white animate-on-scroll"
                >
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
                            なぜ、
                            <span className="text-blue-600">
                                Hi, English!
                            </span>{" "}
                            を開発したのか？
                        </h2>
                        <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-6">
                            <p>
                                「英語が話せたら、もっと世界が広がるのに…」そう感じたことはありませんか？
                                現代社会において、英語は単なるスキルではなく、
                                <b>
                                    あなたから言語の壁を取り払い、多くの可能性を広げるパスポート
                                </b>
                                です。
                                しかし、従来の学習方法では、多くのお客様が「やった気になっただけで何もできるようになっていない」「アプリの機能が使い心地が悪すぎるし、コンテンツも微妙…」と感じ、途中で挫折してしまう現実があります。
                            </p>
                            <p className="font-semibold text-blue-700">
                                私たちは、英語学習におけるこれらの「本質的な障壁」を根本から取り除くことに情熱を注ぎました。
                            </p>
                            <p>
                                <b>Hi, English!</b>
                                は、かつての英語学習アプリとは一線を画します。
                                お客様が本当に英語を使えるようになることを目標とし、
                                そのために必要な
                                <b>
                                    開発コストの高い内部システムを一切妥協せず、すべて実現
                                </b>
                                しました。
                                これにより、お客様は「なんかやった気になったけど何もできるようになってない」という学習体験から完全に解放されます。
                                私たちのサービスは、あらゆる面で
                                <b>ユーザファースト</b>
                                を徹底しています。このサービスは
                                <b>
                                    割のいいお金儲けを目的としておらず、価値あるサービスを提供するため開発コストを完全に度外視しています。
                                </b>
                            </p>
                            <p>
                                英語力の習得には、単なる知識の詰め込みだけでなく、
                                <b>継続的な「慣れ」と「実践」</b>が不可欠です。
                                特に、早期にこの「慣れ」のフェーズを乗り越えることが、飛躍的な英語力向上に繋がります。
                                Hi,
                                English!は、この「慣れ」を効果的に促進し、お客様が挫折することなく、
                                <b>
                                    <span className="text-blue-700">
                                        理論と実践の両面から英語を「扱う」能力
                                    </span>
                                </b>
                                を確実に身につけられるよう設計されています。
                            </p>
                            <p>
                                「英語ができるようになりたい！」と願う、お客様のためのサービスです。
                                私たちは、英語という壁を効率的かつ確実に乗り越えることで、
                                お客様の
                                <b>
                                    <span className="font-bold text-xl text-green-600">
                                        これからの人生の価値を最大化します。
                                    </span>
                                </b>
                                これは、お客様が英語を理由に人生を諦めてしまわないよう、私たちからの
                                <b>力強い後押し</b>です。 これがHi,
                                English!が目指すミッションです。
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- */}
                {/* 価値提供 / Why Hi, English! セクション */}
                <section
                    id="why-us"
                    ref={(el) => {
                        refs.current["why-us"] = el;
                    }}
                    className="py-20 bg-gray-50 animate-on-scroll"
                >
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
                            Hi, English! がお客様の学習を変える
                            <br />
                            <span className="text-blue-600">
                                3つの本質的な価値
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureItem
                                icon={<FaChartLine />}
                                title="お客様の有限な時間を最大化"
                                description="独自に設計された学習パスと連携システムが、無駄なく、確実に英語スキルを向上させます。これにより、お客様は他の大切な活動に集中できる時間を創出できます。"
                                delay={0}
                            />
                            <FeatureItem
                                icon={<FaGamepad />}
                                title="継続できる、洗練された学習体験"
                                description="ミニゲーム、AIバディ、ゲーミフィケーション、そして綿密に設計されたコンテンツ連携が、毎日飽きずに学習を継続する土台を築きます。自然と英語に慣れ親しみ、真の英語力が身につきます。"
                                delay={200}
                            />
                            <FeatureItem
                                icon={<FaBookOpen />}
                                title="英語学習の全てを網羅"
                                description="基礎から会話、添削、発音矯正まで、英語学習に必要な機能がすべてこのプラットフォームに集約。複数のアプリを使い分ける煩わしさはもうありません。包括的だけでなく機能連携を兼ね備えた学習体験で、お客様の英語力向上を加速させます。"
                                delay={400}
                            />
                        </div>
                    </div>
                </section>

                {/* --- */}
                {/* 独自の強みセクション */}
                <section className="py-20 bg-white animate-on-scroll">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                            <span className="text-blue-600">Hi, English!</span>{" "}
                            の確かな強みとこだわり
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="md:order-1 order-2 animate-fade-in-up">
                                <Image
                                    src={SYSTEM_ARCHITECTURE_ILLUSTRATION}
                                    alt="Advanced System Architecture"
                                    width={600}
                                    height={400}
                                    className="rounded-lg shadow-xl w-full h-auto"
                                />
                            </div>
                            <div className="md:order-2 order-1 animate-fade-in-up animate-delay-200">
                                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                                    <span className="text-blue-600">
                                        高品質で未来を見据えた
                                    </span>
                                    高機能システム
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Hi,
                                    English!の根幹は、単なるAIの活用を超えた、
                                    <b>
                                        圧倒的に高品質かつ未来を見通したシステム設計
                                    </b>
                                    です。
                                    お客様の学習しやすさ、楽しさ、効率、効果を最大限に引き出すため、
                                    最先端のAI技術を比較検証し、システム内部での利用を最適化しました。
                                    <b>徹底的かつ網羅的な動作検証</b>
                                    と、品質担保のための
                                    <b>確かな内部技術の工夫</b>
                                    が、この革新的な学習体験を実現しています。
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    AIは、既存の各種機能の利便性や高いUXをさらに高めるための補助であり、
                                    自動コンテンツ生成はその内部で扱えるデータ生成の補助です。
                                    これにより、お客様は想定しているコンテンツを迅速に作成・カスタマイズし、
                                    プラットフォームの機能を最大限に活用できます。
                                    高精度な発音解析や自然な対話が可能な英会話機能も、このシステム全体の構成要素として、
                                    これまでの学習サービスとは一線を画す体験を提供します。
                                </p>
                            </div>

                            <div className="md:order-3 order-3 animate-fade-in-up animate-delay-400">
                                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                                    <span className="text-green-600">
                                        実践で「使える」英語を提供する
                                    </span>
                                    高品質コンテンツ
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Hi,
                                    English!のコンテンツは、単なる知識の習得に留まらず、
                                    <b>
                                        「学んだ英語を実際に使いこなせるようになる」
                                    </b>
                                    ことに徹底的にこだわっています。
                                    私たちが厳選・作成した問題や例文は、
                                    <b>ネイティブが日常的に使う生きた表現</b>
                                    や、
                                    <b>最新の言語データ</b>
                                    に基づいており、その実用性を徹底的に検証しています。
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    文法学習では、
                                    <b className="text-blue-700">
                                        実際の会話シーンやビジネスシーンでどのように使われるか
                                    </b>
                                    を具体的に提示。 英会話では、
                                    <b className="text-blue-700">
                                        現実の多様なシチュエーション
                                    </b>
                                    を想定した対話練習を重ねることで、
                                    お客様の頭の中で「この表現はこう使うんだ」と明確に繋がり、自然と口から英語がこぼれるようになる。
                                    <b className="text-blue-700">
                                        日々の学習が、着実に「使える英語」への確信へと変わっていく
                                    </b>
                                    瞬間を、お客様はHi,
                                    English!で何度も体験するでしょう。
                                </p>
                            </div>
                            <div className="md:order-4 order-4 animate-fade-in-up animate-delay-500">
                                <Image
                                    src={MOCKUP_CONTENT_CREATION}
                                    alt="High Quality Content"
                                    width={600}
                                    height={400}
                                    className="rounded-lg shadow-xl w-full h-auto"
                                />
                            </div>

                            <div className="md:order-5 order-6 animate-fade-in-up animate-delay-600">
                                <Image
                                    src={MOCKUP_PROGRESS_DASHBOARD}
                                    alt="AI Mentoring"
                                    width={600}
                                    height={400}
                                    className="rounded-lg shadow-xl w-full h-auto"
                                />
                            </div>
                            <div className="md:order-6 order-5 animate-fade-in-up animate-delay-700">
                                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                                    <span className="text-purple-600">
                                        AIがアシストするパーソナルメンタリング
                                    </span>
                                    で、お客様の成長を確実にリード
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Hi,
                                    English!では、お客様専属のAIアシスタントが、学習全体を力強くサポートします。
                                    個人の学習履歴や習熟度を自動で分析し、最適な学習パスを提案。
                                    つまずきやすいポイントを自動検出し、集中的な復習を促します。
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    定期的なフィードバックと目標設定支援により、モチベーションを維持しながら、無駄なく確実にスキルを身につけられます。
                                    まるでパーソナルトレーナーのように、お客様の英語学習を最初から最後まで、力強くサポートします。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- */}
                {/* 新規セクション：Hi, English! が提供する未来 */}
                <section
                    id="future-vision"
                    ref={(el) => {
                        refs.current["future-vision"] = el;
                    }}
                    className="py-20 bg-gradient-to-br from-indigo-50 to-blue-100 animate-on-scroll"
                >
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
                            <span className="text-blue-600">Hi, English!</span>{" "}
                            が切り開く、お客様の未来
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="md:order-1 order-2 animate-fade-in-up">
                                <Image
                                    src={FUTURE_VISION_IMAGE}
                                    alt="Future Vision with Hi, English!"
                                    width={650}
                                    height={450}
                                    className="rounded-lg shadow-xl w-full h-auto"
                                />
                            </div>
                            <div className="md:order-2 order-1 animate-fade-in-up animate-delay-200 text-left">
                                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                    Hi,
                                    English!で英語力を手に入れることは、単なる語学学習に留まらず、
                                    <b>
                                        お客様の人生の可能性を広げるための、確かな一歩
                                    </b>
                                    となります。
                                </p>
                                <ul className="text-lg text-gray-700 leading-relaxed space-y-4 list-disc list-inside">
                                    <li>
                                        <b className="text-blue-800">
                                            海外旅行での安心感：
                                        </b>
                                        言語の壁を感じることなく、現地の人々と心を通わせ、忘れられない思い出を作れます。
                                    </li>
                                    <li>
                                        <b className="text-blue-800">
                                            国内外での交流：
                                        </b>
                                        日本にいても、海外の友人や同僚とスムーズにコミュニケーションをとり、新たな人間関係を築けます。
                                    </li>
                                    <li>
                                        <b className="text-blue-800">
                                            仕事での飛躍：
                                        </b>
                                        英語での会議や資料作成、海外とのビジネス交渉も難なくこなせるようになり、キャリアアップのチャンスを掴めます。
                                    </li>
                                    <li>
                                        <b className="text-blue-800">
                                            知的好奇心の解放：
                                        </b>
                                        日本語だけでは触れることのできなかった世界の最新情報、知識、文化に直接触れることができます。
                                    </li>
                                    <li>
                                        <b className="text-blue-800">
                                            時間の最大化：
                                        </b>
                                        英語のリソースを効率的かつ正確に読み解くことで、情報収集にかかる時間を短縮。
                                        本当に集中すべき業務や、お客様の好きなことに、より多くの時間を割けるようになります。
                                    </li>
                                </ul>
                                <p className="text-lg text-gray-700 leading-relaxed mt-6">
                                    Hi,
                                    English!は、お客様の日常をより豊かに、より生産的にするためのパートナーです。
                                    英語学習を通じて、新しい未来を創造する体験を、ぜひお客様も始めてください。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- */}
                {/* 機能一覧セクション */}
                <section
                    id="features"
                    ref={(el) => {
                        refs.current.features = el;
                    }}
                    className="py-20 bg-blue-50 animate-on-scroll"
                >
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
                            Hi, English! が提供する
                            <span className="text-blue-600">
                                豊富な学習機能
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureItem
                                icon={<FaBookOpen />}
                                title="英語学習コンテンツ"
                                description="AIが生成補助する多様な形式の問題で、基礎から応用まで網羅。音声入力、メディア対応、目標連動も。これまでの学習コンテンツでは触れられなかった実践的なニュアンスや、場面ごとの使い分けを学べる独自のコンテンツを多数提供。ミニテストで理解度を即座に確認し、着実にステップアップできます。"
                            />
                            <FeatureItem
                                icon={<FaPenAlt />}
                                title="英文添削機能"
                                description="画像OCRやAI生成英文の添削に対応。難易度設定、音声生成、和訳・発音記号表示に加え、AIがお客様の文章の自然さや表現の豊かさを多角的に評価し、より洗練された英語表現へと導きます。単なる文法ミス指摘に留まらない、プロの視点でのフィードバックが強みです。"
                            />
                            <FeatureItem
                                icon={<FaGamepad />}
                                title="ミニゲーム"
                                description="ワンコそばやバトルゲームなど、飽きずに英語に触れられる多様なミニゲームを提供。単語や文法をゲーム感覚で反復練習することで、学習の定着率を飛躍的に向上させます。楽しみながら自然と英語脳を育成し、学習が「続く」仕組みを追求しました。"
                            />
                            <FeatureItem
                                icon={<FaComments />}
                                title="QA（質問・回答）機能"
                                description="AIや他ユーザー、グループに質問を投げかけ、疑問を即座に解消。いいね、ブックマーク、イベント連動で学習を深めます。疑問を放置せず、活発なコミュニティとAIの力を借りて、常にクリアな状態で学習を進められます。"
                            />
                            <FeatureItem
                                icon={<TbMessageDots />}
                                title="AI英会話機能"
                                description="AIアバターと音声でリアルな会話練習。「ガイド」モードで基礎を固め、「ダイナミック」モードで自由な対話を通じて実践力を養います。高精度な発音フィードバックと、会話の自然な流れを促すAIの応答は、まるでネイティブスピーカーとの会話のようです。"
                            />
                            <FeatureItem
                                icon={<FaChalkboardTeacher />}
                                title="基礎学習機能"
                                description="Progate風スライド学習で視覚的に、ツリー表示文法解説で体系的に理解を深めます。フラッシュカードで基礎を固めるだけでなく、朗読機能でネイティブの自然な発音に触れ、他の学習コンテンツでは学べない、英語のニュアンスや実践的な学習方法を導入。さらにミニテストなども提供し、徹底的に飽きずに効率的かつ効果的な学習を追求しています。"
                            />
                            <FeatureItem
                                icon={<FaBookOpen />}
                                title="英単語・イディオム学習"
                                description="発音、意味、例文を網羅したフラッシュカード、タイムアタック、テストで効率的に語彙力UP。AIで設定をカスタマイズしてコンテンツを自動生成できる他、独自にユーザーがカスタマイズできたり、作成済み問題から問題セットを作成して効率的に学習機能を活用できます。さらに、単語のコンテキストや場面ごとにグルーピングして管理し、学習効率を最大化するシステムと合わせて、効果の最大化と学びやすさを提供しています。英文添削も同様に、カスタマイズ性と効率性を両立しています。"
                            />
                            <FeatureItem
                                icon={<FaMicrophoneAlt />}
                                title="発音矯正機能"
                                description="AI英会話で検出された課題を集中修正。最先端の音声認識AIがお客様の発音をミリ秒単位で解析し、舌の位置や口の形まで詳細なフィードバックを提供。ネイティブに近い発音へと導く、実践的な練習と即時フィードバックで苦手克服をサポートします。"
                            />
                            <FeatureItem
                                icon={<FaChartLine />}
                                title="スキルテスト・レベル判定"
                                description="独自開発のシステムが現在のレベルを正確に判定し、最適な学習パスを自動生成。メンタリングで成長を促進。定期的なテストで成果を可視化し、モチベーションを維持しながら、常に最適な学習状態へと導きます。"
                            />
                            <FeatureItem
                                icon={<MdOutlineDashboard />}
                                title="TL（学習記録集積）機能"
                                description="個人の学習履歴を自動集積・可視化。進捗や成果が一目で分かり、モチベーションを維持。AIが学習データを分析し、お客様の学習傾向や課題を特定。よりパーソナルなアドバイスと、目標達成に向けた次のステップを提示します。"
                            />
                            <FeatureItem
                                icon={<AiOutlineTeam />}
                                title="オリジナルコンテンツ共有"
                                description="他ユーザー作成の高品質な学習コンテンツをダウンロード・利用。自分だけの学習リソースをカスタマイズ。共有機能を通じて、様々な視点や学習方法に触れることができ、学習の幅を広げます。"
                            />
                            <FeatureItem
                                icon={<AiOutlineTrophy />}
                                title="コンペ機能（開発予定）"
                                description="個人ランクとは別の競争要素。他のユーザーと英語力で競い合い、ゲーム感覚でスキルアップ。定期的に開催されるコンペで、お客様の実力を試し、学習のモチベーションをさらに高めます。"
                            />
                            <FeatureItem
                                icon={<FaRobot />}
                                title="AIバディ・キャラ育成（開発予定）"
                                description="お客様を知るAIバディを育成。孤独感を軽減し、パーソナルなサポートで学習を継続。お客様の学習スタイルや感情を理解し、励ましやアドバイスを通じて、まるで親友のように学習を支えます。"
                            />
                            <FeatureItem
                                icon={<FaShieldAlt />}
                                title="保護者向け管理画面"
                                description="お子様の学習進捗管理、利用制限、不適切ワードフィルタリングで安心・安全な学習環境を提供。詳細なレポートで学習状況を把握し、必要に応じて設定を調整することで、お子様の成長をサポートします。"
                            />
                            <FeatureItem
                                icon={<FaEnvelope />}
                                title="通知・リマインダー"
                                description="学習習慣化をサポートするPush通知やメール。保護者への通知機能も完備。適切なタイミングで学習を促し、忙しい日々の中でも英語学習を継続できるようサポートします。"
                            />
                            <FeatureItem
                                icon={<FaExternalLinkAlt />}
                                title="PDF/プリント・ダウンロード"
                                description="問題コンテンツをPDF形式でダウンロード・印刷。オフライン学習にも対応。場所を選ばずに学習を進めることができ、お客様のライフスタイルに合わせた柔軟な学習を可能にします。"
                            />
                            <FeatureItem
                                icon={<RiFileList2Line />}
                                title="TODO・目標管理"
                                description="短期・中期・長期目標を設定し、学習コンテンツと連動。計画的な学習をサポート。具体的な目標設定と進捗管理により、お客様の学習が迷子になることなく、常に目標に向かって着実に進んでいけます。"
                            />
                            <FeatureItem
                                icon={<FaChartLine />}
                                title="定期フィードバック"
                                description="システムによる学習状況の定期的な分析とアドバイス。常に最適な学習方法へと導く。AIがお客様の学習データを深く掘り下げ、具体的な改善点や次の学習ステップを提示。お客様の成長を最大限に引き出します。"
                            />
                        </div>
                    </div>
                </section>

                {/* --- */}
                {/* 学習フローセクション */}
                <section className="py-20 bg-white animate-on-scroll">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
                            Hi, English! での
                            <span className="text-blue-600">学習フロー</span>
                        </h2>
                        <div className="relative flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0">
                            {/* 各ステップ */}
                            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-md md:w-1/4 transform hover:scale-105 transition-transform duration-300">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">
                                    登録＆レベルチェック
                                </h3>
                                <p className="text-gray-600">
                                    簡単な質問と独自テストで、お客様の英語力を正確に診断します。
                                </p>
                            </div>
                            <div className="md:block hidden absolute w-1/4 h-1 bg-blue-300 left-1/4 transform translate-x-1/2 -translate-y-1/2 top-[50%] z-0 arrow-right"></div>

                            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-md md:w-1/4 transform hover:scale-105 transition-transform duration-300">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">
                                    目標設定＆最適な学習パス
                                </h3>
                                <p className="text-gray-600">
                                    お客様のレベルと目標に合わせ、最適なパーソナル学習プランをシステムが自動で作成します。
                                </p>
                            </div>
                            <div className="md:block hidden absolute w-1/4 h-1 bg-blue-300 right-1/4 transform -translate-x-1/2 -translate-y-1/2 top-[50%] z-0 arrow-left"></div>

                            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-md md:w-1/4 transform hover:scale-105 transition-transform duration-300">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">
                                    学習開始＆成長実感
                                </h3>
                                <p className="text-gray-600">
                                    システムのサポートのもと、楽しく学習を継続。ダッシュボードで成長を実感できます。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- */}
                {/* ユーザーの声 / 実績セクション */}
                <section className="py-20 bg-gray-50 animate-on-scroll">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
                            <span className="text-blue-600">
                                お客様の声 (仮です。)
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <TestimonialCard
                                quote="Hi, English!のおかげで、毎日楽しく英語学習が続けられています。AI英会話は本当にリアルで、自信がつきました！"
                                author="田中 陽子"
                                title="会社員（TOEIC 600点→850点）"
                                stars={5}
                            />
                            <TestimonialCard
                                quote="飽きっぽい私でも、ミニゲームやAIバディのおかげで、毎日欠かさず学習できています。気づけばリスニング力が格段にアップしていました。"
                                author="佐藤 健太"
                                title="大学生（英検準1級合格）"
                                stars={4}
                            />
                            <TestimonialCard
                                quote="子どもの英語学習に最適なアプリを探していました。保護者管理機能が充実しており、安心して使わせられます。AIの添削も素晴らしいです。"
                                author="山田 美香"
                                title="主婦（小学3年生のお子様向け）"
                                stars={5}
                            />
                        </div>
                        {/* 実績データの表示（例） */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-blue-800 font-bold text-center">
                            <div className="p-6 bg-white rounded-lg shadow-md animate-fade-in-up">
                                <p
                                    className="text-5xl animate-counter"
                                    data-count="300000"
                                >
                                    300,000+
                                </p>
                                <p className="text-xl mt-2">総ダウンロード数</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg shadow-md animate-fade-in-up animate-delay-200">
                                <p
                                    className="text-5xl animate-counter"
                                    data-count="95"
                                >
                                    95%+
                                </p>
                                <p className="text-xl mt-2">継続率</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg shadow-md animate-fade-in-up animate-delay-400">
                                <p
                                    className="text-5xl animate-counter"
                                    data-count="4.8"
                                >
                                    4.8+
                                </p>
                                <p className="text-xl mt-2">ストア平均評価</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- */}
                {/* 料金プランセクション */}
                <section
                    id="pricing"
                    ref={(el) => {
                        refs.current.pricing = el;
                    }}
                    className="py-20 bg-blue-50 animate-on-scroll"
                >
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
                            お客様に合った
                            <span className="text-blue-600">料金プラン</span>
                            を見つけましょう (仮です。)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                            {pricingPlans.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`bg-white p-8 rounded-lg shadow-xl flex flex-col justify-between transform transition-all duration-300 hover:scale-[1.03] ${
                                        plan.highlight
                                            ? "border-4 border-blue-600 scale-[1.02] shadow-2xl"
                                            : "border border-gray-200"
                                    }`}
                                >
                                    <div>
                                        {plan.highlight && (
                                            <div className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full inline-block mb-3">
                                                一番人気！
                                            </div>
                                        )}
                                        <h3 className="text-2xl font-bold mb-4 text-gray-800">
                                            {plan.name}
                                        </h3>
                                        <p className="text-5xl font-extrabold text-blue-600 mb-2">
                                            {plan.price}
                                            <span className="text-lg text-gray-600">
                                                /{plan.frequency}
                                            </span>
                                        </p>
                                        <ul className="text-left text-gray-700 space-y-2 mb-8">
                                            {plan.features.map((feature, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-center"
                                                >
                                                    <FaCheck className="text-green-500 mr-2" />
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: feature,
                                                        }}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Link
                                        href={plan.buttonLink}
                                        className={`block w-full text-center px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 ${
                                            plan.highlight
                                                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                        }`}
                                    >
                                        {plan.buttonText}
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-gray-600 text-sm">
                            ※表示価格は全て税込みです。無料体験期間もございます。
                        </p>
                    </div>
                </section>

                {/* --- */}
                {/* 安心・安全への取り組みセクション */}
                <section className="py-20 bg-white animate-on-scroll">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
                            <span className="text-blue-600">安心・安全</span>
                            への徹底的な取り組み
                        </h2>
                        <div className="max-w-4xl mx-auto text-center text-lg text-gray-700 leading-relaxed mb-10">
                            Hi, English!は、
                            <b>
                                とある学生ITエンジニアが、その得意とするセキュリティ分野の技術力を結集
                            </b>
                            して構築しました。
                            お客様に安心してご利用いただくため、
                            <b>数千以上の脅威モデル</b>に対し、
                            <b>すべてのレイヤーで対策</b>
                            を講じることで、最高レベルのセキュリティと堅牢なシステムを実現しています。この確かな技術力と経験があるからこそ、私たちは皆様に最高の学習環境を安全安心に提供できます。
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md flex flex-col items-center text-center animate-fade-in-up">
                                <FaShieldAlt className="text-5xl text-blue-600 mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-gray-800">
                                    多層防御と厳格なデータ管理
                                </h3>
                                <p className="text-gray-600">
                                    脅威モデリングに基づき、通信ケースごとの多層防御モデルを構築。データ暗号化はもちろん、重要なデータを保持しない設計や、通信ごとのアクセスレベルを厳格に制御することで、お客様の学習データと個人情報を徹底的に保護します。
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md flex flex-col items-center text-center animate-fade-in-up animate-delay-200">
                                <MdOutlineDashboard className="text-5xl text-blue-600 mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-gray-800">
                                    堅牢な認証・認可と不正検知
                                </h3>
                                <p className="text-gray-600">
                                    バイパス対策を施した堅牢な認証・認可モデルを導入。サニタイズ、バリデーションを徹底し、内部で著作権チェックやシードの不正検出、不正な通信や挙動をリアルタイムで検知・防御する機構を完備しています。
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md flex flex-col items-center text-center animate-fade-in-up animate-delay-400">
                                <FaRobot className="text-5xl text-blue-600 mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-gray-800">
                                    多様な攻撃からの防御とコンテンツフィルタリング
                                </h3>
                                <p className="text-gray-600">
                                    <b>数千以上の様々な攻撃に対する防御機構</b>
                                    を導入し、常に最新の脅威に対応。AIが不適切なワードやコンテンツを自動でフィルタリングし、お子様を含む全てのお客様に安全で健全な学習環境を提供します。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- */}
                {/* FAQセクション */}
                <section
                    id="faq"
                    ref={(el) => {
                        refs.current.faq = el;
                    }}
                    className="py-20 bg-blue-50 animate-on-scroll"
                >
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
                            よくある<span className="text-blue-600">質問</span>
                        </h2>
                        <div className="max-w-3xl mx-auto space-y-4 text-left">
                            <details className="bg-white p-6 rounded-lg shadow-md group">
                                <summary className="flex justify-between items-center cursor-pointer text-xl font-semibold text-gray-800">
                                    無料でどこまで利用できますか？
                                    <span className="transform transition-transform duration-300 group-open:rotate-180">
                                        ▼
                                    </span>
                                </summary>
                                <p className="mt-4 text-gray-700">
                                    無料プランでは、基本的な学習コンテンツの一部、AI問題自動生成の回数制限付き利用、英単語・イディオム学習の一部、ミニゲームの一部、学習進捗管理機能をご利用いただけます。全ての機能をご利用いただくにはPremium
                                    Planへのアップグレードが必要です。
                                </p>
                            </details>
                            <details className="bg-white p-6 rounded-lg shadow-md group">
                                <summary className="flex justify-between items-center cursor-pointer text-xl font-semibold text-gray-800">
                                    AI英会話はどのような内容ですか？
                                    <span className="transform transition-transform duration-300 group-open:rotate-180">
                                        ▼
                                    </span>
                                </summary>
                                <p className="mt-4 text-gray-700">
                                    AI英会話には「ガイド」モードと「ダイナミック」モードがあります。「ガイド」モードでは、あらかじめ用意された選択肢に沿って会話を進め、フィードバックを受けられます。「ダイナミック」モードでは、自由に会話ができ、AIが詳細なヒントや発音フィードバックを提供します。様々なテーマやユースケースを選択できます。
                                </p>
                            </details>
                            <details className="bg-white p-6 rounded-lg shadow-md group">
                                <summary className="flex justify-between items-center cursor-pointer text-xl font-semibold text-gray-800">
                                    子供でも安全に利用できますか？
                                    <span className="transform transition-transform duration-300 group-open:rotate-180">
                                        ▼
                                    </span>
                                </summary>
                                <p className="mt-4 text-gray-700">
                                    はい、お子様にも安心してご利用いただけます。保護者向け管理画面で、利用時間制限や特定の機能の利用可否を設定できます。また、AIによる不適切な用語のフィルタリング機能も導入しており、安全な学習環境を維持しています。
                                </p>
                            </details>
                        </div>
                    </div>
                </section>

                {/* --- */}
                {/* CTAセクション */}
                <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center animate-on-scroll">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 drop-shadow-lg">
                            さあ、お客様の英語学習を
                            <br />
                            <span className="text-yellow-300">
                                Hi, English!
                            </span>{" "}
                            で始めよう！
                        </h2>
                        <p className="text-lg md:text-xl mb-10 opacity-90">
                            Hi, English!は、お客様の英語習得の成功、そして
                            <b className="font-bold text-yellow-300">
                                新しい日常を豊かにする贈り物
                            </b>
                            となることを願っています。
                        </p>
                        <Link
                            href="#"
                            className="bg-white text-blue-600 text-xl px-10 py-5 rounded-full font-bold shadow-2xl hover:bg-gray-100 transition-all transform hover:scale-105"
                        >
                            無料で今すぐ体験する！
                        </Link>
                    </div>
                </section>
            </main>

            {/* フッター */}
            <footer className="bg-gray-800 text-gray-300 py-12">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">
                            Hi, English!
                        </h3>
                        <p className="text-sm">
                            究極の学習体験を提供する、お客様の未来を拓く英語学習プラットフォーム。
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FaTwitter size={24} />
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FaFacebook size={24} />
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FaInstagram size={24} />
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FaLinkedin size={24} />
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FaYoutube size={24} />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">
                            機能
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#features"
                                    className="hover:text-white transition-colors text-sm"
                                >
                                    英語学習コンテンツ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#features"
                                    className="hover:text-white transition-colors text-sm"
                                >
                                    AI英会話
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#features"
                                    className="hover:text-white transition-colors text-sm"
                                >
                                    英文添削
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#features"
                                    className="hover:text-white transition-colors text-sm"
                                >
                                    ミニゲーム
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#features"
                                    className="hover:text-white transition-colors text-sm"
                                >
                                    英単語・イディオム
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#features"
                                    className="hover:text-white transition-colors text-sm"
                                >
                                    QA機能
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">
                            サポート
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#faq"
                                    className="hover:text-white transition-colors text-sm"
                                >
                                    よくある質問
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition-colors text-sm"
                                >
                                    お問い合わせ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition-colors text-sm"
                                >
                                    プライバシーポリシー
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition-colors text-sm"
                                >
                                    利用規約
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">
                            企業情報
                        </h3>
                        <p className="text-sm">株式会社 [あなたの会社名]</p>
                        <p className="text-sm">〒XXX-XXXX XXXXXXXXX</p>
                        <p className="text-sm mt-2">
                            &copy; {new Date().getFullYear()} Hi, English! All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* グローバルCSSに追記するアニメーション定義例 */}
            <style jsx global>{`
                @keyframes fadeInScaleUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .animate-fade-in-up {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeInScaleUp 0.8s ease-out forwards;
                }

                .animate-delay-200 {
                    animation-delay: 0.2s;
                }
                .animate-delay-300 {
                    animation-delay: 0.3s;
                }
                .animate-delay-400 {
                    animation-delay: 0.4s;
                }
                .animate-delay-500 {
                    animation-delay: 0.5s;
                }
                .animate-delay-600 {
                    animation-delay: 0.6s;
                }
                .animate-delay-700 {
                    animation-delay: 0.7s;
                }

                /* スクロール連動アニメーションの初期状態 */
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(20px);
                }

                /* JavaScriptで追加されるアニメーションクラス */
                .animate-fade-in-up.animate-on-scroll {
                    animation: fadeInScaleUp 0.8s ease-out forwards;
                }

                /* 背景パーティクルアニメーション */
                @keyframes particleAnimation {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        transform: translate(
                                calc(var(--rand-x) * 100vw),
                                calc(var(--rand-y) * 100vh)
                            )
                            scale(1.2);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(
                                calc(var(--rand-x) * 200vw),
                                calc(var(--rand-y) * 200vh)
                            )
                            scale(0.8);
                        opacity: 0;
                    }
                }

                .animate-particle {
                    animation: particleAnimation var(--animation-duration)
                        linear infinite alternate;
                }
                /* 各パーティクルにランダムな変数を与えるにはJSでstyleを直接設定するか、CSS Variablesを使う */

                /* カウンターアニメーション (JSで実装することを推奨) */
                .animate-counter::after {
                    content: attr(data-count);
                }

                /* 学習フローの矢印 */
                .arrow-right::after {
                    content: "";
                    position: absolute;
                    right: -10px; /* 矢印の先端の位置調整 */
                    top: 50%;
                    transform: translateY(-50%) rotate(45deg);
                    width: 20px;
                    height: 20px;
                    border-top: 2px solid theme("colors.blue.300");
                    border-right: 2px solid theme("colors.blue.300");
                }

                .arrow-left::before {
                    content: "";
                    position: absolute;
                    left: -10px; /* 矢印の先端の位置調整 */
                    top: 50%;
                    transform: translateY(-50%) rotate(225deg);
                    width: 20px;
                    height: 20px;
                    border-top: 2px solid theme("colors.blue.300");
                    border-right: 2px solid theme("colors.blue.300");
                }
            `}</style>
        </div>
    );
};

export default LPPage;

// FaCheck は React Iconsにないので別途追加します。
// プロジェクトにない場合は、FaCheckCircleなど他のアイコンで代替するか、
// @fortawesome/free-solid-svg-icons から import { faCheck } を使って対応してください。
// 仮でここに定義します。
const FaCheck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="1em"
        width="1em"
        {...props}
    >
        <path d="M173.898 439.404L32.235 297.741c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L216 322.502l149.999-149.999c9.373-9.373 24.569-9.373 33.941 0l22.667 22.667c9.373 9.373 24.569 9.373 0 33.941L207.839 439.404c-9.373 9.372-24.569 9.372-33.941 0z"></path>
    </svg>
);
