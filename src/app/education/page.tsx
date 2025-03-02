import WwiiQuiz from "../../components/InteractiveTest";

export default function QuizPage() {
    return (
        <div className="min-h-screen bg-[#9D1915] py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-center text-5xl font-bold text-white mb-8">
                    Тесты
                </h1>
                <WwiiQuiz />
            </div>
        </div>
    );
}