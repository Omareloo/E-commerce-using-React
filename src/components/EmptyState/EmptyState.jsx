// /src/components/EmptyState/EmptyState.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import emptyImage from "../../assets/images/gg.PNG"; 

export default function EmptyState({ keyword }) {
  const navigate = useNavigate();
  const isSearchEmpty = !!keyword;

  return (
    // هذا الـ Div يمتد على كامل عرض الـ products div ويقوم بتوسيط المحتوى داخله
    <div
      style={{
        width: "100%", 
        display: 'flex', 
        justifyContent: 'center', 
        padding: "50px 0", 
      }}
    >
        {/* هذا الـ Div هو حاوية المحتوى الفعلي وله أقصى عرض (maxWidth) */}
        <div
            style={{
                textAlign: "center",
                maxWidth: "650px", 
                width: '100%',
            }}
        >
            {/* الصورة */}
            <img
                src={emptyImage}
                alt="Not Found"
                style={{
                    width: "250px",
                    maxWidth: "100%",
                    marginBottom: "20px",
                }}
            />

            {/* العنوان */}
            <h2
                style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    color: "#333",
                }}
            >
                {isSearchEmpty
                ? "We couldn't find what you were looking for"
                : "No Products Available"}
            </h2>

            {/* الوصف */}
            <p
                style={{
                    fontSize: "15px",
                    color: "#666",
                    marginBottom: "20px",
                    lineHeight: "1.6",
                }}
            >
                {isSearchEmpty ? (
                    <>
                        Keep calm and search again. <br />
                        We have <strong>SO many</strong> other products that you will like!
                    </>
                ) : (
                    "It looks like there are no products in our store right now. Please check back later."
                )}
            </p>

            {/* زرار الاستمرار */}
            <button
                onClick={() => navigate("/")}
                style={{
                    padding: "12px 26px",
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "0.3s ease",
                }}
            >
                CONTINUE SHOPPING
            </button>
        </div>
    </div>
  );
}