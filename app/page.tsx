import Link from 'next/link';
import Image from 'next/image';
import { getAllTypeDescriptions } from '@/lib/type-descriptions';
import { getTypeImage } from '@/lib/type-images';

export default function Home() {
  const allTypes = getAllTypeDescriptions();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            MBTI性格診断アプリ
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            科学的根拠に基づく正確な診断
          </p>
          <Link
            href="/test"
            className="inline-block bg-blue-500 text-white px-10 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition-all shadow-lg"
          >
            診断をはじめる
          </Link>
        </div>
      </section>

      {/* MBTIとは Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            MBTIとは
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              MBTI（Myers-Briggs Type Indicator）は、外から観察しやすい行動特徴ではなく、
              個々人が自然と行っている「ものの見方と判断の方法」など、
              外からは観察できない「認知スタイル」に焦点を当てた性格類型理論です。
            </p>
            <p className="text-gray-700 leading-relaxed">
              4つの指標（E/I, S/N, T/F, J/P）の組み合わせで、
              16種類のタイプに分類され、自己理解や対人関係の改善に役立ちます。
            </p>
          </div>
        </div>
      </section>

      {/* 診断の特徴 Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            診断の特徴
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-500">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                科学的根拠
              </h3>
              <p className="text-gray-700">
                MBTI理論に基づいた正確な質問で、確実な判定を実現
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                詳細な分析
              </h3>
              <p className="text-gray-700">
                4つの次元を多角的に分析し、あなたの性格を正確に診断
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 border-2 border-green-500">
              <h3 className="text-xl font-bold text-green-900 mb-3">
                わかりやすい結果
              </h3>
              <p className="text-gray-700">
                視覚的なスコア表示で、直感的に理解できる結果を提供
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6 border-2 border-orange-500">
              <h3 className="text-xl font-bold text-orange-900 mb-3">
                実用的な情報
              </h3>
              <p className="text-gray-700">
                適職診断や相性診断など、実生活に役立つ情報を提供
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4つの次元 Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            4つの次元
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-3">
                E (外向性) / I (内向性)
              </h3>
              <p className="text-gray-700">
                エネルギーの方向と源。人と過ごすことで活力を得るか、一人の時間で回復するか。
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-purple-600 mb-3">
                S (感覚) / N (直観)
              </h3>
              <p className="text-gray-700">
                情報の収集方法。具体的な事実を重視するか、可能性やパターンに着目するか。
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-green-600 mb-3">
                T (思考) / F (感情)
              </h3>
              <p className="text-gray-700">
                判断の基準。論理と客観性を重視するか、価値観と人間関係を重視するか。
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-orange-600 mb-3">
                J (判断) / P (知覚)
              </h3>
              <p className="text-gray-700">
                外界への接し方。計画的に進めるか、柔軟に対応するか。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 16タイプ一覧 Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            16のタイプ
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {allTypes.map((type) => (
              <div
                key={type.type}
                className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="relative w-full h-40 bg-gray-100">
                  <Image
                    src={getTypeImage(type.type)}
                    alt={type.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-xl font-bold text-blue-600 mb-1">
                    {type.type}
                  </p>
                  <p className="text-sm text-gray-700">{type.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            あなたのタイプを知ろう
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            30問の質問に答えて、あなたの性格タイプを診断
          </p>
          <Link
            href="/test"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
          >
            診断をはじめる
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">運営: <a href="https://yumesuta.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">ゆめスタ</a></p>
          <p className="text-sm text-gray-500 mt-2">
            ※ このアプリは公式MBTI®の代替ではなく、MBTI理論を参考にした性格診断です
          </p>
        </div>
      </footer>
    </div>
  );
}
