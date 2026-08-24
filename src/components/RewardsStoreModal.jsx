import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audioFX';
import { initialRewards } from '../data/rewards';

export default function RewardsStoreModal({
  isOpen,
  onClose,
  userPoints,
  onDeductPoints,
  currentLang = 'hy'
}) {
  const [activeTab, setActiveTab] = useState('store'); // 'store' | 'my_coupons'
  const [myCoupons, setMyCoupons] = useState([]);
  const [redeemedCodeModal, setRedeemedCodeModal] = useState(null);

  const isArmenian = currentLang === 'hy';

  if (!isOpen) return null;

  const handleRedeem = (reward) => {
    if (userPoints < reward.ptsCost) {
      alert(
        isArmenian
          ? `Ձեզ անհրաժեշտ է ևս ${reward.ptsCost - userPoints} PTS այս մրցանակը ստանալու համար:`
          : `You need ${reward.ptsCost - userPoints} more PTS to redeem this reward!`
      );
      return;
    }

    soundFX.playVictoryJingle();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });

    // Deduct points
    onDeductPoints(reward.ptsCost);

    // Generate Coupon Code
    const couponCode = `YVN-REWARD-${(myCoupons.length + 1) * 123456 % 900000 + 100000}`;
    const newCoupon = {
      ...reward,
      couponCode,
      redeemedAt: new Date().toLocaleDateString()
    };

    setMyCoupons((prev) => [newCoupon, ...prev]);
    setRedeemedCodeModal(newCoupon);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0b0e14] border-2 border-[var(--primary-gold)] p-4 sm:p-7 max-w-3xl lg:max-w-4xl w-full relative shadow-[0_0_50px_var(--primary-gold-glow)] rounded-2xl space-y-4 max-h-[90dvh] overflow-y-auto custom-scrollbar pb-28 sm:pb-8">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-[var(--primary-gold)] p-1.5 text-2xl font-bold transition-colors rounded-full hover:bg-white/10"
        >
          ✕
        </button>

        {/* Header & Balance */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 pr-8 sm:pr-0">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--primary-gold)]/10 border border-[var(--primary-gold)]/40 rounded-full text-xs font-mono text-[var(--primary-gold)] uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-sm">storefront</span>
              <span>YEREVAN CIVIC MARKETPLACE</span>
            </div>
            <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              🎁 {isArmenian ? 'ՄԻԱՎՈՐՆԵՐԻ ԽԱՆՈՒԹ & ԶԵՂՉԵՐ' : 'CIVIC REWARDS STORE'}
            </h2>
          </div>

          <div className="bg-[#121620] p-3 border-2 border-[var(--primary-gold)] rounded-xl text-right shadow-lg self-start sm:self-auto">
            <span className="text-xs font-mono text-gray-400 block uppercase font-medium">YOUR BALANCE</span>
            <span className="font-['Outfit'] font-black text-[var(--primary-gold)] text-lg sm:text-xl">
              {userPoints} PTS
            </span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/10 gap-2">
          <button
            onClick={() => { soundFX.playClick(); setActiveTab('store'); }}
            className={`py-2.5 px-4 font-['Archivo_Narrow'] text-xs sm:text-sm font-extrabold uppercase transition-all rounded-t-lg border-b-2 ${
              activeTab === 'store'
                ? 'border-[var(--primary-gold)] text-[var(--primary-gold)] bg-[var(--primary-gold)]/10 font-black'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            🏬 {isArmenian ? 'ՄՐՑԱՆԱԿՆԵՐԻ ՑՈՒՑԱԿ' : 'AVAILABLE PERKS'}
          </button>

          <button
            onClick={() => { soundFX.playClick(); setActiveTab('my_coupons'); }}
            className={`py-2.5 px-4 font-['Archivo_Narrow'] text-xs sm:text-sm font-extrabold uppercase transition-all rounded-t-lg border-b-2 flex items-center gap-1.5 ${
              activeTab === 'my_coupons'
                ? 'border-[#10b981] text-[#10b981] bg-[#10b981]/10 font-black'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            🎟️ {isArmenian ? 'ԻՄ ԿՈՒՊՈՆՆԵՐԸ' : 'MY COUPONS'} ({myCoupons.length})
          </button>
        </div>

        {/* Content: Store Perks */}
        {activeTab === 'store' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {initialRewards.map((reward) => {
              const title = isArmenian ? reward.titleHy : reward.titleEn;
              const desc = isArmenian ? reward.descHy : reward.descEn;
              const canAfford = userPoints >= reward.ptsCost;

              return (
                <div
                  key={reward.id}
                  className="bg-[#121620] border border-white/10 hover:border-[var(--primary-gold)] p-4 sm:p-5 rounded-xl flex flex-col justify-between space-y-3.5 transition-all group relative overflow-hidden shadow-md"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl p-2.5 bg-[#0b0e14] border border-white/10 rounded-lg">
                        <span className="material-symbols-outlined text-2xl" style={{ color: reward.color }}>
                          {reward.icon}
                        </span>
                      </span>
                      <span className="font-['Outfit'] text-xs sm:text-sm font-black text-[var(--primary-gold)] bg-[var(--primary-gold)]/10 border border-[var(--primary-gold)]/30 px-3 py-1 rounded-full">
                        {reward.ptsCost} PTS
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block font-medium">
                        {reward.category} • {reward.partner}
                      </span>
                      <h4 className="font-['Outfit'] text-base sm:text-lg font-bold text-white uppercase mt-0.5 group-hover:text-[var(--primary-gold)] transition-colors">
                        {title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm font-['Montserrat'] text-gray-300 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford}
                    className={`w-full py-3.5 font-['Archivo_Narrow'] text-xs sm:text-sm lg:text-base font-extrabold uppercase transition-all rounded-xl flex items-center justify-center gap-1.5 ${
                      canAfford
                        ? 'btn-primary-glow text-black'
                        : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">confirmation_number</span>
                    <span>
                      {canAfford
                        ? isArmenian ? 'ՍՏԱՆԱԼ ԿՈՒՊՈՆԸ' : 'REDEEM PERK'
                        : isArmenian ? 'ԱՆՀՐԱԺԵՇՏ ԵՆ ՄԻԱՎՈՐՆԵՐ' : 'INSUFFICIENT PTS'}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Content: My Coupons */}
        {activeTab === 'my_coupons' && (
          <div>
            {myCoupons.length === 0 ? (
              <div className="p-8 bg-[#121620] border border-white/10 rounded-xl text-center space-y-3">
                <span className="material-symbols-outlined text-5xl text-gray-500">local_activity</span>
                <h3 className="font-['Outfit'] text-base font-bold text-gray-300 uppercase">
                  {isArmenian ? 'ԴԵՌ ՉՈՒՆԵՔ ԱԿՏԻՎ ԿՈՒՊՈՆՆԵՐ' : 'NO ACTIVATED COUPONS YET'}
                </h3>
                <p className="font-['Montserrat'] text-xs text-gray-400 max-w-sm mx-auto">
                  {isArmenian
                    ? 'Մաքրեք աղտոտվածության hotspot-ները, վաստակեք PTS և փոխանակեք դրանք տրանսպորտի ու սրճարանների զեղչերի հետ:'
                    : 'Clean hotspots, earn PTS and exchange them for transit passes and partner discounts.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {myCoupons.map((coupon, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#121620] border-2 border-[#10b981] rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-3 shadow-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl text-[#10b981]">{coupon.icon}</span>
                        <h4 className="font-['Outfit'] text-base font-bold text-white uppercase">
                          {isArmenian ? coupon.titleHy : coupon.titleEn}
                        </h4>
                      </div>
                      <p className="text-xs font-mono text-[#10b981]">
                        CODE: <span className="bg-black px-2 py-0.5 border border-[#10b981] rounded font-bold">{coupon.couponCode}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => setRedeemedCodeModal(coupon)}
                      className="bg-[#10b981] text-black font-['Archivo_Narrow'] font-black text-xs px-3.5 py-2 uppercase rounded-lg hover:bg-[#059669] transition-all self-start sm:self-auto"
                    >
                      📱 {isArmenian ? 'ՑՈՒՑԱԴՐԵԼ QR ԿՈԴԸ' : 'SHOW QR COUPON'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Single Coupon Code Presentation Modal Overlay */}
        {redeemedCodeModal && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fadeIn">
            <div className="bg-[#0b0e14] border-2 border-[#10b981] p-6 max-w-sm w-full text-center space-y-4 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.4)] relative">
              <button
                onClick={() => setRedeemedCodeModal(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>

              <div className="space-y-1">
                <span className="text-3xl">🎉</span>
                <h3 className="font-['Outfit'] text-xl font-black text-white uppercase tracking-tight">
                  {isArmenian ? 'ԿՈՒՊՈՆՆ ԱԿՏԻՎԱՑՎԱԾ Է' : 'COUPON ACTIVATED'}
                </h3>
                <p className="text-xs font-['Montserrat'] text-gray-300">
                  {isArmenian ? redeemedCodeModal.titleHy : redeemedCodeModal.titleEn}
                </p>
              </div>

              {/* QR Code Graphic Simulation */}
              <div className="bg-white p-4 rounded-xl inline-block shadow-inner mx-auto">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${redeemedCodeModal.couponCode}&color=0b0e14`}
                  alt="QR Code"
                  className="w-40 h-40 mx-auto"
                />
              </div>

              <div className="p-2.5 bg-[#121620] border border-[#10b981]/40 rounded-lg font-mono text-xs text-[#10b981]">
                <span>COUPON: </span>
                <span className="font-bold text-white tracking-widest">{redeemedCodeModal.couponCode}</span>
              </div>

              <p className="text-[11px] text-gray-400">
                {isArmenian
                  ? 'Ցուցադրեք այս QR կոդը տրանսպորտում կամ սրճարանում զեղչը ստանալու համար:'
                  : 'Present this QR coupon code at partner locations to claim perk.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
