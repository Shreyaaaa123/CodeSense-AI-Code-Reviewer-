import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [titleText, setTitleText] = useState("");

  const fullTitle = "CodeSense – AI Code Reviewer";

  // Typing animation for title
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTitleText(fullTitle.slice(0, index + 1));
      index++;
      if (index > fullTitle.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  // ✅ Validate JavaScript / ReactJS code only
  function isValidCode(code, lang) {
    if (lang === "javascript" || lang === "react") {
      try {
        new Function(code);
        return true;
      } catch {
        return false;
      }
    }
    return true;
  }

  // ✅ Heuristic invalid code detection for other languages
  function isProbablyInvalid(code) {
    const minLength = 3;
    const programmingChars = /[{}();=<>]/;
    if (code.trim().length < minLength) return true;
    if (!programmingChars.test(code)) return true;
    return false;
  }

  // ✅ Live validation and invalid code feedback
  useEffect(() => {
    if (code.trim() === "") {
      setReview("");
      return;
    }
    if (!isValidCode(code, language)) {
      setReview("❌ Invalid code. Please write valid JavaScript / ReactJS syntax.");
    } else if (language !== "javascript" && language !== "react" && isProbablyInvalid(code)) {
      setReview("❌ Invalid code. Please write proper code syntax.");
    } else {
      setReview("");
    }
  }, [code, language]);

  // ✅ Send code for AI review
  async function reviewCode() {
    if ((!isValidCode(code.trim(), language)) ||
        (language !== "javascript" && language !== "react" && isProbablyInvalid(code.trim()))) {
      setReview("❌ Invalid code. Please write proper code syntax.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://code-sense-backend-8lbb.onrender.com", { code, language });
      setReview(response.data);
    } catch (error) {
      console.error(error);
      setReview("⚠️ Error connecting to AI review service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <h1 className={loading ? "loading" : ""}>
          {titleText} <span className={`robot ${loading ? "spin" : ""}`}>🤖</span>
        </h1>
      </nav>

      {/* Main Content */}
      <main>
        <div className="left">
          {/* Language Selector */}
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="react">ReactJS</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="csharp">C#</option>
            <option value="ruby">Ruby</option>
            <option value="go">Go</option>
            <option value="php">PHP</option>
          </select>

          {/* Editor Wrapper */}
          <div className="code editor-wrapper">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(val) => {
                let prismLang = language;
                if (language === "react") prismLang = "jsx";
                else if (language === "c") prismLang = "c";
                return prism.highlight(val, prism.languages[prismLang] || prism.languages.javascript, prismLang);
              }}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
            {code === "" && <span className="placeholder">Write your code here...</span>}
          </div>

          {/* Review Button */}
          <div
            onClick={!loading ? reviewCode : null}
            className={`review ${loading ? "loading" : ""}`}
          >
            {loading ? "Reviewing..." : "Review"}
          </div>
        </div>

        {/* Review Result */}
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review || "Write your code and click Review to get AI feedback.📝"}
          </Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
