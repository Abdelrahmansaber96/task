"use client";

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>حدث خطأ</h1>
      <p>{error.message}</p>
      <button onClick={reset}>إعادة المحاولة</button>
    </div>
  );
}
