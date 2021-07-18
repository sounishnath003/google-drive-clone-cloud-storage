export function offlineDetector(): void {
  window.addEventListener("offline", () => {
    window.alert("You are Offline! Please check your internet connection!");
  });
}
