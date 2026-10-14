function updateClockAndCheckTimers() {
  const now = new Date();

  // 1. Ambil jam dan menit saat ini
  const currentHours = String(now.getHours()).padStart(2, "0");
  const currentMinutes = String(now.getMinutes()).padStart(2, "0");
  const currentHM = `${currentHours}:${currentMinutes}`;

  // Tampilkan Jam Digital
  const clockEl = document.getElementById("digital-clock");
  if (clockEl) {
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clockEl.innerText = `${currentHM}:${seconds}`;
  }

  // 2. Cek Timer L1 & L2
  ["l1", "l2"].forEach((id) => {
    const timerActive = document.getElementById(`timer-active-${id}`);

    // Pastikan sakelar diaktifkan
    if (!timerActive || !timerActive.checked) return;

    const inputON = document.getElementById(`timer-on-${id}`);
    const inputOFF = document.getElementById(`timer-off-${id}`);

    if (!inputON || !inputOFF) return;

    const timeON = inputON.value; // Hasil: "HH:mm"
    const timeOFF = inputOFF.value; // Hasil: "HH:mm"

    // Cek Waktu Nyala (ON)
    if (timeON && currentHM === timeON) {
      if (lastTriggeredMinute[`${id}_on`] !== currentHM) {
        lastTriggeredMinute[`${id}_on`] = currentHM;
        console.log(`[TIMER TRIGGER] ${id} dinyalakan pada ${currentHM}`);
        setLampuUI(id, true, true);
      }
    }

    // Cek Waktu Mati (OFF)
    if (timeOFF && currentHM === timeOFF) {
      if (lastTriggeredMinute[`${id}_off`] !== currentHM) {
        lastTriggeredMinute[`${id}_off`] = currentHM;
        console.log(`[TIMER TRIGGER] ${id} dimatikan pada ${currentHM}`);
        setLampuUI(id, false, true);
      }
    }
  });
}
