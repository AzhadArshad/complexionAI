import React, { useState, useRef } from "react";
import { Upload, Send, Sparkles } from "lucide-react";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import "./ProductAnalyzer.css";

const ProductAnalyzer = () => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef();

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("auth_user_id", "USER_AUTH_ID_HERE");

    try {
      const res = await fetch("http://localhost:8000/api/analyze-product", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("AI Response:", data);
      alert("Analysis complete! Check console.");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="product-analyzer">
      <div className="page-header">
        <div>
          <h1>Product Analyzer</h1>
          <p className="page-subtitle">
            Upload product images to analyze ingredients with AI
          </p>
        </div>
      </div>

      <Card padding="lg" className="analyzer-container">
        <div className="ai-assistant">
          <div className="assistant-avatar">
            <Sparkles size={24} />
          </div>
          <div className="assistant-message">
            <h3>Product Analyzer AI</h3>
            <p>
              Hello! I can analyze skincare products for you. Simply upload an
              image of your product's ingredient list or label, and I'll break
              down the ingredients, highlight any concerns, and tell you if it's
              suitable for your skin type.
            </p>
            <p className="assistant-prompt">
              Click the <Upload size={16} /> button below to upload a product
              image!
            </p>
          </div>
        </div>

        <div className="analyzer-actions">
          <Button
            variant="outline"
            icon={<Upload size={18} />}
            onClick={handleUpload}
          >
            Upload Image
          </Button>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <form onSubmit={handleSendMessage} className="chat-input-container">
          <input
            type="text"
            placeholder="Or type a question about the product..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-input"
          />
          <Button type="submit" variant="primary" icon={<Send size={18} />}>
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProductAnalyzer;
