'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [showBeginner, setShowBeginner] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        {showBeginner && (
          <div className={styles.advancedBeginnerMessage}>
            <span className={styles.beginnerIcon} aria-hidden="true">💡</span>
            <span>
              <strong>For Beginners:</strong> This editor is designed for those new to <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b>. <span className={styles.beginnerHighlight}>Experiment, learn, and see your code come alive instantly!</span>
            </span>
          </div>
        )}
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Live Code Editor</h1>
          <p className={styles.subtitle}>Write, Edit, and Preview HTML, CSS, and JavaScript in Real-Time</p>
          <button 
            onClick={() => router.push('/editor')}
            className={styles.ctaButton}
          >
            Start Coding Now
          </button>
        </div>
        <div className={styles.heroAnimation}>
          {[...Array(50)].map((_, i) => (
            <span key={i} style={{ '--i': i } as React.CSSProperties}></span>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Real-Time Preview</h3>
            <p>See your changes instantly as you type with live preview functionality. No need to refresh!</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎨</div>
            <h3>Syntax Highlighting</h3>
            <p>Beautiful syntax highlighting for HTML, CSS, and JavaScript with the Monokai theme</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📱</div>
            <h3>Responsive Design</h3>
            <p>Works seamlessly on both desktop and mobile devices with adaptive layouts</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔄</div>
            <h3>Split View</h3>
            <p>Side-by-side editor and preview on desktop, stacked view on mobile</p>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className={styles.codeExamples}>
        <h2 className={styles.sectionTitle}>Try It Out</h2>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <h3>HTML Example</h3>
            <pre className={styles.codeBlock}>
              {`<div class="container">
  <h1>Hello World!</h1>
  <p>Start coding now...</p>
</div>`}
            </pre>
          </div>
          <div className={styles.exampleCard}>
            <h3>CSS Example</h3>
            <pre className={styles.codeBlock}>
              {`.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`}
            </pre>
          </div>
          <div className={styles.exampleCard}>
            <h3>JavaScript Example</h3>
            <pre className={styles.codeBlock}>
              {`document.querySelector('h1')
  .addEventListener('click', () => {
    alert('Hello!');
  });`}
            </pre>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Write Your Code</h3>
            <p>Use our powerful editor to write HTML, CSS, and JavaScript code with syntax highlighting</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>See Live Preview</h3>
            <p>Watch your changes come to life instantly in the preview panel</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Test Responsively</h3>
            <p>View your code in action across different screen sizes</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.cta}>
        <h2>Ready to Start Coding?</h2>
        <p>Experience the power of real-time code editing and preview</p>
        <button 
          onClick={() => router.push('/editor')}
          className={styles.ctaButton}
        >
          Launch Editor
        </button>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 Live Code Editor. All rights reserved.</p>
      </footer>
    </div>
  );
} 