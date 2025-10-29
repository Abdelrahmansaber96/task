export async function getUsersSSR(link) {
  const res = await fetch(link, {
    cache: "no-store",
  });
  return res.json();
}
export async function getUsersSSG(link) {
  const res = await fetch(link, {
    cache: "force-cache",
  });
  return res.json();
}
export async function getUsersISR(link) {
  try {
    const res = await fetch(link, {
      next: { revalidate: 10 }, // ISR: إعادة التحقق كل 10 ثواني
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return Array.isArray(data) ? data : []; // تأكد أن النتيجة مصفوفة
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return [];
  }
}
