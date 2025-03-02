"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const questions = [
    {
        question: "Когда началась Великая Отечественная война?",
        options: ["22 июня 1941", "1 сентября 1939", "9 мая 1945", "7 ноября 1917"],
        correct: 0,
    },
    {
        question: "Как назывался план нападения Германии на СССР?",
        options: ["Барбаросса", "Тайфун", "Цитадель", "Ост"],
        correct: 0,
    },
    {
        question: "Какой город выдержал 872 дня блокады?",
        options: ["Москва", "Ленинград", "Сталинград", "Киев"],
        correct: 1,
    },
    {
        question: "Когда был подписан акт о капитуляции Германии?",
        options: ["30 апреля 1945", "2 сентября 1945", "9 мая 1945", "8 мая 1945"],
        correct: 3,
    },
    {
        question: "Какой маршал принимал Парад Победы в 1945 году?",
        options: ["Г. Жуков", "И. Конев", "А. Василевский", "К. Рокоссовский"],
        correct: 0,
    },
    {
        question: "Какое событие стало началом освобождения СССР?",
        options: ["Битва за Москву", "Курская битва", "Сталинградская битва", "Операция 'Багратион'"],
        correct: 3,
    },
    {
        question: "Где прошел крупнейший танковый бой ВОВ?",
        options: ["Прохоровка", "Минск", "Смоленск", "Ржев"],
        correct: 0,
    },
    {
        question: "Как назывался первый освобожденный советский город?",
        options: ["Орёл", "Курск", "Минск", "Смоленск"],
        correct: 0,
    },
    {
        question: "Какой город был взят последним в ходе войны?",
        options: ["Берлин", "Прага", "Вена", "Будапешт"],
        correct: 1,
    },
    {
        question: "Как назывался план СССР по контрнаступлению в 1944 году?",
        options: ["Операция 'Багратион'", "Операция 'Уран'", "Операция 'Тайфун'", "Операция 'Кутузов'"],
        correct: 0,
    },
];

const WwiiQuiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleAnswer = (index: number) => {
        setSelectedOption(index);
        if (index === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
        setTimeout(() => {
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedOption(null);
            } else {
                setShowResult(true);
            }
        }, 1000);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
    };

    return (
        <div className="min-h-screen flex items-center justify-center text-white p-4">
            <div className="max-w-2xl w-full bg-white text-black p-6 shadow-lg rounded-2xl">
                {showResult ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[#9D1915]">Результат теста</h2>
                        <p className="text-lg mt-4">
                            Вы ответили правильно на <span
                            className="text-[#F7DF00] font-bold">{score}</span> из {questions.length} вопросов.
                        </p>
                        <button
                            onClick={restartQuiz}
                            className="mt-6 px-6 py-2 bg-[#9D1915] text-white rounded-md hover:bg-[#7d1412] transition"
                        >
                            Пройти тест заново
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold text-[#9D1915] mb-4">{questions[currentQuestion].question}</h2>
                        <div className="grid gap-4">
                            {questions[currentQuestion].options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    whileTap={{scale: 0.95}}
                                    className={`px-4 py-2 text-left border rounded-md text-lg font-semibold transition-colors ${
                                        selectedOption !== null
                                            ? index === questions[currentQuestion].correct
                                                ? "bg-green-500 text-white"
                                                : selectedOption === index
                                                    ? "bg-red-500 text-white"
                                                    : "bg-gray-200"
                                            : "bg-gray-100 hover:bg-gray-300"
                                    }`}
                                    onClick={() => handleAnswer(index)}
                                    disabled={selectedOption !== null}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </div>
                        <p className="mt-4 text-gray-500">
                            Вопрос {currentQuestion + 1} из {questions.length}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WwiiQuiz;
