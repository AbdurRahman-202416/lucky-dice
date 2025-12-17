"use client";
import React, { useState } from "react";
import ResultModal from "./ResultModal";
import { JSX } from "react/jsx-runtime";

export default function DiceComponent() {
  const [score, setScore] = useState(0);
  const [selectedDice, setSelectedDice] = useState(null);
  const [rolledDice, setRolledDice] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState("");
  const [animatedValue, setAnimatedValue] = useState(1);
  const [showResultModal, setShowResultModal] = useState(false);

  const diceNumbers = [1, 2, 3, 4, 5, 6];

  const DiceDots = ({ number, size = "normal" }) => {
    const dotClass = size === "large" ? "w-4 h-4" : "w-2.5 h-2.5";

    const renderDots = () => {
      const dots: JSX.Element[] = [];
      const positions = {
        1: [[50, 50]],
        2: [
          [25, 25],
          [75, 75],
        ],
        3: [
          [25, 25],
          [50, 50],
          [75, 75],
        ],
        4: [
          [25, 25],
          [75, 25],
          [25, 75],
          [75, 75],
        ],
        5: [
          [25, 25],
          [75, 25],
          [50, 50],
          [25, 75],
          [75, 75],
        ],
        6: [
          [25, 25],
          [75, 25],
          [25, 50],
          [75, 50],
          [25, 75],
          [75, 75],
        ],
      };

      positions[number]?.forEach((pos, idx) => {
        dots.push(
          <div
            key={idx}
            className={`${dotClass} rounded-full bg-black shadow-lg absolute`}
            style={{
              left: `${pos[0]}%`,
              top: `${pos[1]}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      });
      return dots;
    };

    return <>{renderDots()}</>;
  };

  const DiceFace = ({
    number,
    isSelected,
    onClick,
    isResult,
    size = "normal",
  }) => {
    const sizeClass = size === "large" ? "w-32 h-32" : "w-20 h-20";

    return (
      <button
        onClick={onClick}
        disabled={isRolling || gameOver || won}
        className={`
          relative ${sizeClass} rounded-2xl transition-all duration-300 transform
          ${
            isSelected
              ? "scale-110 shadow-2xl ring-4 ring-yellow-400"
              : "hover:scale-105 hover:shadow-xl"
          }
          ${isRolling ? "cursor-not-allowed" : "cursor-pointer"}
          bg-gradient-to-br from-gray-100 via-white to-gray-200
          shadow-xl border-gray-300
        `}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: isSelected
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255,255,255,0.5)"
            : "0 20px 25px -5px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255,255,255,0.5)",
        }}
      >
        <div className="absolute inset-1 bg-gradient-to-br from-white/40 to-transparent rounded-xl z-0 pointer-events-none"></div>
        <div className="relative bg-indigo-50 rounded-xl border-2 border-indigo-950 z-10 w-full h-full">
          <DiceDots number={number} size={size} />
        </div>
        {isSelected && (
          <div className="absolute -top-3 z-50 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-800 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
            <span className="text-white text-sm font-bold">✓</span>
          </div>
        )}
      </button>
    );
  };

  const RollingDice = () => (
    <div className="relative w-32 h-32 mx-auto">
      <div
        className="w-full h-full animate-spin"
        style={{ animationDuration: "0.9s" }}
      >
        <DiceFace
          number={animatedValue}
          onClick={() => {}}
          size="large"
          isSelected={undefined}
          isResult={undefined}
        />
      </div>
    </div>
  );

  const handleDiceSelect = (num) => {
    if (!isRolling && !gameOver && !won) {
      setSelectedDice(num);
    }
  };

  const rollDice = () => {
    if (selectedDice === null || isRolling) return;

    setShowResultModal(true);
    setIsRolling(true);
    setMessage("");
    setRolledDice(null);

    let count = 0;
    const interval = setInterval(() => {
      setAnimatedValue(Math.floor(Math.random() * 6) + 1);
      count++;

      if (count > 15) {
        clearInterval(interval);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setAnimatedValue(finalRoll);
        setRolledDice(finalRoll);

        setTimeout(() => {
          let newScore = score;

          if (finalRoll === selectedDice) {
            newScore += 2;
            setMessage("🎉 Match! +2");
          } else {
            newScore -= 2;

            setMessage("💥Wrong! -2 Points");
          }

          setScore(newScore);
          if (newScore >= 20) {
            setWon(true);
            setShowResultModal(false);
          }
          if (newScore <= -20) {
            setGameOver(true);
            setShowResultModal(false);
          }

          setIsRolling(false);
          setSelectedDice(null);
        }, 700);
      }
    }, 100);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
  };

  const resetGame = () => {
    setScore(0);
    setSelectedDice(null);
    setRolledDice(null);
    setGameOver(false);
    setWon(false);
    setMessage("");
    setAnimatedValue(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className=" w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className=" text-2xl sm:text-6xl font-black mb-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
            LUCKY DICE MASTER
          </h1>
          <p className="text-sm sm:text-xl text-gray-300 font-semibold tracking-wide">
            Match the dice and reach 10 points to win!
          </p>
        </div>

        {/* Score Dashboard */}
        <div className="grid grid-cols-3 text-center gap-4 sm:gap-6.25 mb-8 ">
          {/* Danger Zone */}
          <div
            className="
      bg-gradient-to-br from-red-500/20 to-red-600/20
      backdrop-blur-xl rounded-2xl p-1 sm:p-6
      border border-red-500/30 shadow-xl
      transform scale-95 translate-z-[-40px]
      transition-all duration-300
    "
          >
            <p className="text-red-400 text-xs sm:text-sm uppercase tracking-wider mb-1 sm:mb-2 font-bold">
              Danger Zone
            </p>
            <p className="text-3xl sm:text-4xl font-black text-red-400 text-center">
              -20
            </p>
          </div>

          {/* Current Score (Focused) */}
          <div
            className="
      bg-gradient-to-br from-white/10 to-white/5
      backdrop-blur-xl rounded-2xl p-1 sm:p-6
      border border-white/20 shadow-2xl
      transform scale-110 translate-z-[60px]
      transition-all duration-300
    "
          >
            <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-wider mb-1 sm:mb-2 font-bold text-center">
              Current Score
            </p>
            <p
              className={`text-3xl sm:text-5xl font-black text-center ${
                score >= 0 ? "text-green-400" : "text-red-400"
              } drop-shadow-lg`}
            >
              {score}
            </p>
          </div>

          {/* Win Target */}
          <div
            className="
      bg-gradient-to-br from-yellow-500/20 to-orange-600/20
      backdrop-blur-xl rounded-2xl p-1 sm:p-6
      border border-yellow-500/30 shadow-xl
      transform scale-95 translate-z-[-40px]
      transition-all duration-300
    "
          >
            <p className="text-yellow-400 text-xs sm:text-sm uppercase tracking-wider mb-1 sm:mb-2 font-bold">
              Win Target
            </p>
            <p className="text-3xl sm:text-4xl font-black text-yellow-400 text-center">
              20
            </p>
          </div>
        </div>

        {/* Main Game Panel */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-3xl rounded-3xl p-4 border border-white/20 shadow-2xl">
          {/* Selection Area */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded"></div>
              <p className="text-white font-bold text-lg uppercase tracking-wider px-4">
                Select Your Dice
              </p>
              <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded"></div>
            </div>

            <div className="grid  grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center w-full">
              {diceNumbers.map((num) => (
                <DiceFace
                  key={num}
                  number={num}
                  isSelected={selectedDice === num}
                  onClick={() => handleDiceSelect(num)}
                />
              ))}
            </div>
          </div>

          {/* Roll Button */}
          <button
            onClick={rollDice}
            disabled={selectedDice === null || isRolling || gameOver || won}
            className={`
              w-full py-6 rounded-2xl font-black text-[14px] sm:text-2xl transition-all duration-300 uppercase tracking-wider
              ${
                selectedDice === null || isRolling || gameOver || won
                  ? "bg-gray-700 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-green-700 via-emerald-800 to-teal-900 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-2xl transform hover:scale-105 "
              }
              text-white border-2 border-white/30
            `}
          >
            {isRolling
              ? "🎲 Rolling..."
              : selectedDice
              ? "🎲 Roll The Dice!"
              : "⚠️ Select a Number First"}
          </button>

          {/* Result Display */}

          <ResultModal
            isOpen={showResultModal}
            isRolling={isRolling}
            rolledDice={rolledDice}
            message={message}
            DiceFace={DiceFace}
            RollingDice={RollingDice}
            onClose={closeResultModal}
          />
        </div>
      </div>

      {/* Game Over Modal */}
      {(gameOver || won) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div
            className={`
            ${
              won
                ? "bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500"
                : "bg-gradient-to-br from-gray-800 via-gray-900 to-black"
            }
            rounded-3xl p-10 max-w-lg w-full border-4 border-white/30 shadow-2xl transform animate-bounce
          `}
          >
            <div className="text-center">
              <div className="text-8xl mb-6 animate-pulse">
                {won ? "🏆" : "💀"}
              </div>
              <h2 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
                {won ? "VICTORY!" : "GAME OVER"}
              </h2>
              <p className="text-white/90 text-2xl mb-8 font-bold">
                Final Score:{" "}
                <span
                  className={`${
                    score >= 0 ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {score}
                </span>
              </p>
              <button
                onClick={resetGame}
                className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-black text-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 shadow-lg uppercase tracking-wider"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
