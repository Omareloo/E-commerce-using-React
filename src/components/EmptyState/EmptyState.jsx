// /src/components/EmptyState/EmptyState.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import emptyImage from "../../assets/images/gg.PNG"; 
import { useSelector } from "react-redux";

export default function EmptyState({ keyword }) {
  const navigate = useNavigate();
  const isSearchEmpty = !!keyword;
  const {content} = useSelector((state) => state.lang);

  return (
    <div
      style={{
        width: "100%", 
        display: 'flex', 
        justifyContent: 'center', 
        padding: "50px 0", 
      }}
    >
        <div
            style={{
                textAlign: "center",
                maxWidth: "650px", 
                width: '100%',
            }}
        >
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
                ? content.notfound
                : content.NoProductsAvailable
                }
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
                        {content.Keepcalmandsearchagain} <br />
                        {content.otherproducts}
                    </>
                ) : (
                    content.nodata)}
            </p>

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
                {content.continueShopping}            </button>
        </div>
    </div>
  );
}