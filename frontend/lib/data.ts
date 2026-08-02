import { Profile } from "./types";

// Fallback data used at build time or if the FastAPI backend is unreachable.
// Keep this in sync with backend/data.py — the backend is the source of truth
// once it's running.
export const FALLBACK_PROFILE: Profile = {
  name: "Marriam Fatima",
  role: "AI/ML Engineer",
  tagline: "Machine Learning Projects · AI Automation & Chatbot Solutions · Technical Educator",
  location: "Faisalabad, Punjab, Pakistan",
  email: "maryamqurban329@gmail.com",
  phone: "+92-307-9667743",
 summary:
    "Motivated AI/ML Engineer and BSCS graduate (Gomal University) with hands-on experience " +
    "building and deploying machine learning applications, including NLP classifiers, " +
    "plagiarism-detection tools, and LLM-based chatbots. Currently advancing applied AI/ML " +
    "skills through the FlyRank AI ML Engineering Internship. Combines strong programming " +
    "fundamentals with collegiate-level teaching experience, enabling clear communication " +
    "of complex technical concepts.",
  skills: [
    {
      group: "AI & ML",
      tags: [
        "machine-learning",
        "nlp",
        "svm",
        "naive-bayes",
        "logistic-regression",
        "langchain",
        "llm-chatbots",
        "prompt-engineering",
        "hugging-face",
      ],
    },
    { group: "Languages", tags: ["python", "c", "cpp"] },
    {
      group: "Deployment & Tools",
      tags: ["hugging-face-spaces", "github", "google-colab", "reportlab"],
    },
  ],
  competencies: [
    "Machine Learning & NLP",
    "AI Chatbot & Automation Development",
    "Data Analysis & Visualization",
    "Curriculum Design & Lecturing",
    "Mentoring & Communication",
  ],
  experience: [
    {
      title: "Computer Science Lecturer",
      org: "College-Level Institution",
      location: "Faisalabad, Pakistan",
      dates: "2023 – Present",
      points: [
        "Elevated student proficiency in Computer Science fundamentals by designing and delivering structured college-level lectures, resulting in measurable improvement in academic performance across enrolled cohorts.",
        "Increased classroom engagement and comprehension by integrating practical programming exercises (Python, C/C++) into lesson plans, enabling students to apply theoretical concepts to real-world problems.",
        "Streamlined curriculum delivery by developing well-structured course materials aligned with collegiate academic standards, reducing preparation time and improving consistency of instruction.",
        "Strengthened institutional learning outcomes by mentoring students individually, fostering critical thinking and analytical skills essential for technology-focused careers.",
      ],
    },
    {
      title: "AI/ML Engineering Intern",
      org: "FlyRank",
      location: "Remote",
      dates: "2026 – Present",
      points: [
        "Selected for FlyRank's self-paced AI ML Engineering Internship, completing structured onboarding, the Builder Ladder self-assessment, and multiple Anthropic Academy certification courses.",
        "Building a capstone project on Google Search ranking and discoverability, progressing toward a Week 8 live demo.",
      ],
    },
  ],
  projects: [
    {
      title: "Plagiarism Checker Web App",
      stack: ["Python", "Gradio", "Hugging Face Spaces"],
      description:
        "Built and deployed a plagiarism detection tool using Python and Gradio, hosted live on Hugging Face Spaces.",
      link: "https://github.com/MarriamFatima-alt/plagiarism-checker",
      link_label: "GitHub",
      demo_link: "https://huggingface.co/spaces/Marriam-Fatima/plagiarism-checker",
      demo_label: "Live Demo",
    },
    {
      title: "NLP Text Classification System",
      stack: ["Python", "scikit-learn"],
      description:
        "Developed and compared SVM, Naive Bayes, and Logistic Regression classifiers on a Titanic-derived dataset; diagnosed a preprocessing bug causing uniform ~63% accuracy and improved model performance to 74–79% after the fix.",
      link: null,
      link_label: null,
    },
    {
      title: "PDF Chatbot",
      stack: ["LangChain", "Hugging Face Models"],
      description:
        "Built a document question-answering chatbot using LangChain and free Hugging Face models to enable conversational querying of PDF content.",
      link: null,
      link_label: null,
    },
    {
      title: "AI-Based Data Analysis System",
      stack: ["Python", "NumPy", "Pandas"],
      description:
        "Designed and implemented a data pipeline to ingest, clean, and analyze structured datasets, producing statistical summaries and visual reports that transformed raw data into actionable insights.",
      link: null,
      link_label: null,
    },
    {
      title: "House Price Prediction",
      stack: ["Random Forest", "Ames Dataset"],
      description:
        "Built a regression model to predict house prices using the Ames Housing dataset, applying Random Forest and reinforcing conceptual understanding of ensemble methods.",
      link: null,
      link_label: null,
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "Gomal University, D.I. Khan, Pakistan",
    },
  ],
  certifications: [
    "FlyRank — AI ML Engineering Internship (in progress), 2026",
    "Anthropic Academy — Multiple AI/ML Certification Courses, 2026",
    "Credit Corps Certificate — Professional Development, 2023",
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/marriam-fatima-47687b409/",
    github: "https://github.com/MarriamFatima-alt",
    booking: "https://calendly.com/maryamqurban329/30min",
  },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Fetches the profile from the FastAPI backend. Falls back to the static
 * data above (so the site still renders) if the backend isn't running —
 * e.g. during `next build` on a host where the API isn't deployed yet.
 */
export async function getProfile(): Promise<Profile> {
  try {
    const res = await fetch(`${API_URL}/api/profile`, {
      // Revalidate periodically instead of caching forever, and don't let
      // a slow/unreachable backend hang the page.
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    return (await res.json()) as Profile;
  } catch {
    return FALLBACK_PROFILE;
  }
}
