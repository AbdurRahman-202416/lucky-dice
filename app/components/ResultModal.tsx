"use client";
import React from "react";

export default function ResultModal({
  isOpen,
  isRolling,
  rolledDice,
  message,
  DiceFace,
  RollingDice,
  onClose,
}: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-3xl rounded-2xl flex items-center justify-center w-full z-50 p-4 animate-fadeIn">
      <div className="   shadow-2xl">
        <div className="text-center">
          {/* <h3 className="text-white text-2xl font-black mb-6 uppercase tracking-wider">
            Dice Result
          </h3> */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded"></div>
            <p className="text-white font-bold text-lg uppercase tracking-wider px-4">
              Dice Result
            </p>
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded"></div>
          </div>

          <div className=" flex items-center justify-center">
            {isRolling ? (
              <RollingDice />
            ) : (
              <>
                <DiceFace number={rolledDice} size="large" onClick={() => {}} />
              </>
            )}
          </div>

          {message && !isRolling && (
            <p
              className={`text-2xl font-bold mt-2 ${
                message.includes("Match") ? "text-green-400" : "text-red-400"
              } animate-bounce`}
            >
              {message}
            </p>
          )}

          {!isRolling && (
            <button
              onClick={onClose}
              className="mt-8 bg-white text-gray-900 px-8 py-3 rounded-xl font-black text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg uppercase tracking-wider"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
