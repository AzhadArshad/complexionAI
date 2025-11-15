import React, { useState, useRef, useEffect } from "react";
import { Upload, Send, Sparkles } from "lucide-react";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import "./ProductAnalyzer.css";

const ProductAnalyzer = () => {
  const [message, setMessage] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef();
  const analysisContentRef = useRef();

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("auth_user_id", "USER_AUTH_ID_HERE");

    setLoading(true);
    setAnalysisResult(null);
    setDisplayedText("");

    try {
      const res = await fetch("http://localhost:8000/api/analyze-product", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("AI Response:", data);

      if (data.status === "success") {
        setAnalysisResult(data);
        setLoading(false);
        setIsTyping(true);
      } else {
        alert("Analysis failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error analyzing product. Please try again.");
      setLoading(false);
    }
  };

  // Typing animation effect
  useEffect(() => {
    if (!analysisResult || !isTyping) return;

    const fullText = analysisResult.analysis;
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;

        // Auto-scroll to bottom as text appears
        if (analysisContentRef.current) {
          analysisContentRef.current.scrollTop = analysisContentRef.current.scrollHeight;
        }
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 10); // Adjust speed here (lower = faster)

    return () => clearInterval(typingInterval);
  }, [analysisResult, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  // Helper function to parse markdown-like text
  const parseAnalysis = (text) => {
    if (!text) return [];

    const lines = text.split("\n");
    const sections = [];
    let currentSection = null;

    lines.forEach((line) => {
      if (line.startsWith("# ")) {
        if (currentSection) sections.push(currentSection);
        currentSection = { type: "h1", content: line.substring(2), items: [] };
      } else if (line.startsWith("## ")) {
        if (currentSection && currentSection.items.length > 0) {
          sections.push(currentSection);
        }
        currentSection = { type: "h2", content: line.substring(3), items: [] };
      } else if (line.startsWith("### ")) {
        currentSection?.items.push({ type: "h3", content: line.substring(4) });
      } else if (line.startsWith("**") && line.endsWith("**")) {
        currentSection?.items.push({
          type: "bold",
          content: line.slice(2, -2),
        });
      } else if (line.startsWith("- ")) {
        currentSection?.items.push({ type: "li", content: line.substring(2) });
      } else if (line.trim()) {
        currentSection?.items.push({ type: "p", content: line });
      }
    });

    if (currentSection) sections.push(currentSection);
    return sections;
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
        {!analysisResult && (
          <div className="ai-assistant">
            <div className="assistant-avatar">
              <Sparkles size={24} />
            </div>
            <div className="assistant-message">
              <h3>Product Analyzer AI</h3>
              <p>
                Hello! I can analyze skincare products for you. Simply upload an
                image of your product's ingredient list or label, and I'll break
                down the ingredients, highlight any concerns, and tell you if
                it's suitable for your skin type.
              </p>
              <p className="assistant-prompt">
                Click the <Upload size={16} /> button below to upload a product
                image!
              </p>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-state">
            <Sparkles className="sparkle-icon" size={32} />
            <p>Analyzing your product...</p>
          </div>
        )}

        {analysisResult && (
          <div className="analysis-results">
            <div className="result-header">
              <Sparkles size={20} />
              <h2>Analysis Complete!</h2>
            </div>

            <div className="ingredients-section">
              <h3>Ingredients Detected</h3>
              <div className="ingredients-list">
                {analysisResult.ingredients_extracted?.split("\n").map(
                  (ingredient, idx) =>
                    ingredient.trim() && (
                      <span key={idx} className="ingredient-tag">
                        {ingredient.replace(/^-\s*/, "")}
                      </span>
                    )
                )}
              </div>
            </div>

            <div className="analysis-content" ref={analysisContentRef}>
              {parseAnalysis(isTyping ? displayedText : analysisResult.analysis).map((section, idx) => (
                <div key={idx} className="analysis-section">
                  {section.type === "h1" && (
                    <h2 className="section-title-main">{section.content}</h2>
                  )}
                  {section.type === "h2" && (
                    <h3 className="section-title">{section.content}</h3>
                  )}
                  <div className="section-content">
                    {section.items.map((item, itemIdx) => (
                      <div key={itemIdx} className={`content-${item.type}`}>
                        {item.type === "h3" && <h4>{item.content}</h4>}
                        {item.type === "bold" && (
                          <strong>{item.content}</strong>
                        )}
                        {item.type === "li" && (
                          <li>
                            {item.content
                              .split("**")
                              .map((part, i) =>
                                i % 2 === 0 ? (
                                  part
                                ) : (
                                  <strong key={i}>{part}</strong>
                                )
                              )}
                          </li>
                        )}
                        {item.type === "p" && (
                          <p>
                            {item.content
                              .split("**")
                              .map((part, i) =>
                                i % 2 === 0 ? (
                                  part
                                ) : (
                                  <strong key={i}>{part}</strong>
                                )
                              )}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {isTyping && <span className="typing-cursor">▊</span>}
            </div>

            <div className="analyzer-actions">
              <Button
                variant="outline"
                icon={<Upload size={18} />}
                onClick={handleUpload}
              >
                Analyze Another Product For Me
              </Button>
            </div>
          </div>
        )}

        {!loading && !analysisResult && (
          <div className="analyzer-actions">
            <Button
              variant="outline"
              icon={<Upload size={18} />}
              onClick={handleUpload}
            >
              Upload Image
            </Button>
          </div>
        )}

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
