/* ==========================================================================
   AMAN DEEP MAURYA - Interactive Portfolio Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initSkillsFilter();
  initProjectModals();
  initResumeModal();
  initClipboardButtons();
  initContactForm();
  initStatCounters();
});

/* --------------------------------------------------------------------------
   Theme Switcher (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check stored theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        // Moon icon for switching to dark
        themeIcon.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
      } else {
        // Sun icon for switching to light
        themeIcon.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`;
      }
    }
  }
}

/* --------------------------------------------------------------------------
   Navigation & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  // Active section indicator using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   Skills Filter Logic
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Projects Deep-Dive Modals
   -------------------------------------------------------------------------- */
const projectData = {
  data_viz: {
    title: "Data Analysis & Visualization Project",
    badge: "Python, Pandas & Matplotlib",
    image: "assets/images/project_data_viz.jpg",
    overview: "Comprehensive exploratory data analysis and visual intelligence report engineered in Python (Pandas, Matplotlib) and Microsoft Excel to extract critical operational patterns from large multi-dimensional datasets.",
    keyPoints: [
      "Extracted, cleansed, and normalized complex tabular records using Pandas DataFrame transformations, handling outliers and missing values.",
      "Engineered high-contrast statistical graphs (time-series, multi-variable correlation heatmaps, cohort bar charts) using Matplotlib.",
      "Synthesized critical trends into executive summaries to enable data-backed decision making.",
      "Integrated automated Excel data-processing workflows with pivot tables and dynamic chart templates."
    ],
    techStack: ["Python", "Pandas", "Matplotlib", "NumPy", "Microsoft Excel", "Jupyter Notebook"],
    codeSnippet: `# Exploratory Data Analysis & Trend Generation in Python
import pandas as pd
import matplotlib.pyplot as plt

def analyze_dataset(filepath):
    # Load and clean tabular dataset
    df = pd.read_csv(filepath)
    df.dropna(subset=['revenue', 'category'], inplace=True)
    
    # Calculate group aggregates
    summary = df.groupby('category').agg({
        'revenue': ['sum', 'mean', 'count']
    })
    
    # Generate visualization
    plt.figure(figsize=(10, 6))
    plt.style.use('dark_background')
    plt.bar(summary.index, summary['revenue']['sum'], color='#6366f1')
    plt.title('Performance & Revenue Analysis by Category')
    plt.xlabel('Category')
    plt.ylabel('Total Output')
    plt.tight_layout()
    return summary`
  },
  dsa_c: {
    title: "Data Structures Implementation in C",
    badge: "Low-Level Systems & Algorithmic Rigor",
    image: "assets/images/project_c_dsa.jpg",
    overview: "Modular and high-efficiency implementation of fundamental Computer Science data structures written in pure C language, focused on manual heap memory management, pointer arithmetic, and algorithmic optimization.",
    keyPoints: [
      "Constructed Singly and Doubly Linked Lists with dynamic node allocation, boundary checking, and O(1)/O(n) traversal mechanics.",
      "Implemented LIFO Stacks and FIFO Queues utilizing both static circular buffers and dynamic heap nodes.",
      "Ensured zero memory leaks verified through strict allocation and deallocation (`malloc`, `free`) paradigms.",
      "Conducted rigorous Big-O time and space complexity benchmarking across all CRUD and search routines."
    ],
    techStack: ["C Language", "Data Structures", "Pointers", "Memory Management", "GCC Compiler", "GDB Debugger"],
    codeSnippet: `// LIFO Stack Node & Dynamic Allocation in C
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

void push(Node** top, int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (!newNode) {
        fprintf(stderr, "Heap overflow! Memory allocation failed.\\n");
        return;
    }
    newNode->data = value;
    newNode->next = *top;
    *top = newNode;
}

int pop(Node** top) {
    if (*top == NULL) {
        printf("Stack Underflow!\\n");
        return -1;
    }
    Node* temp = *top;
    int poppedValue = temp->data;
    *top = (*top)->next;
    free(temp);
    return poppedValue;
}`
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalContent = document.getElementById('project-modal-body');
  const modalTitle = document.getElementById('project-modal-title');
  const modalClose = document.getElementById('project-modal-close');
  const projectButtons = document.querySelectorAll('[data-project-trigger]');

  projectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-trigger');
      const data = projectData[projectId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalContent.innerHTML = `
        <div style="margin-bottom: 24px; border-radius: 12px; overflow: hidden; max-height: 280px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 280px; object-fit: cover;">
        </div>
        
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
          ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 22px;">
          ${data.overview}
        </p>

        <h4 style="font-size: 1.1rem; margin-bottom: 12px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <span style="color: var(--secondary-light);">✦</span> Key Engineering Highlights
        </h4>
        <ul style="list-style: none; margin-bottom: 24px; display: flex; flex-direction: column; gap: 8px;">
          ${data.keyPoints.map(p => `
            <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.95rem; color: var(--text-secondary);">
              <span style="color: var(--secondary-light); font-weight: 700;">•</span>
              <span>${p}</span>
            </li>
          `).join('')}
        </ul>

        <h4 style="font-size: 1.1rem; margin-bottom: 12px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <span style="color: var(--primary-light);">✦</span> Core Implementation Sample
        </h4>
        <pre style="background: rgba(0,0,0,0.5); padding: 18px; border-radius: 10px; border: 1px solid var(--border-color); font-family: var(--font-mono); font-size: 0.85rem; color: #a5f3fc; overflow-x: auto; line-height: 1.5;"><code>${escapeHtml(data.codeSnippet)}</code></pre>
      `;

      modalOverlay.classList.add('active');
    });
  });

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }
}

/* --------------------------------------------------------------------------
   Resume Modal (ATS-Friendly View + Print Handler)
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const resumeOpenBtns = document.querySelectorAll('[data-resume-open]');
  const resumeCloseBtn = document.getElementById('resume-modal-close');
  const printBtn = document.getElementById('resume-print-btn');
  const copyResumeBtn = document.getElementById('resume-copy-btn');

  resumeOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) resumeModal.classList.add('active');
    });
  });

  if (resumeCloseBtn && resumeModal) {
    resumeCloseBtn.addEventListener('click', () => resumeModal.classList.remove('active'));
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) resumeModal.classList.remove('active');
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (copyResumeBtn) {
    copyResumeBtn.addEventListener('click', () => {
      const resumePlainText = `AMAN DEEP MAURYA
Lucknow, Uttar Pradesh, India | Phone: +91 9305987879 | Email: cuteamandeep26@bbdu.ac.in | LinkedIn: linkedin.com/in/aman-deep-maurya-b4795029a

CAREER OBJECTIVE
Detail-oriented Computer Science Engineering student specializing in Artificial Intelligence, with hands-on experience in Python, C, and data analysis. Seeking an entry-level position or internship where I can apply my technical skills to real-world projects and contribute to organizational growth while continuing to build expertise in AI and data-driven problem solving.

EDUCATION
• Bachelor of Technology (B.Tech) in Computer Science & Engineering (AI)
  Babu Banarasi Das University, Lucknow | 2023 – Present
  Coursework: Data Structures, DBMS, OOP Concepts, AI Fundamentals, Operating Systems
• Senior Secondary / High School Education | Science & Mathematics Stream

TECHNICAL SKILLS
• Programming Languages: C, Python
• Data Analysis & Visualization: Excel, Pandas, NumPy, Matplotlib
• Web Technologies: HTML, CSS, JavaScript Basics
• Databases & Core Concepts: DBMS, Data Structures (C), Object-Oriented Programming (OOP)
• Tools & Platforms: Git, GitHub, VS Code, Jupyter Notebook
• Office Suite: MS Word, MS Excel, MS PowerPoint
• Operating Systems: Windows, Linux (basics)
• Soft Skills: Problem Solving, Effective Communication, Teamwork & Collaboration, Quick Learner & Adaptability

ACADEMIC PROJECTS
1. Data Analysis & Visualization Project
   - Processed and analyzed structured datasets using Excel and Python (Pandas, Matplotlib) to extract key trends and generate insightful visual reports.
   - Presented findings through clear charts and summaries to support data-driven conclusions.

2. Data Structures Implementation in C
   - Designed and implemented fundamental data structures — Linked Lists, Stacks, and Queues — in C to strengthen algorithmic problem-solving skills.
   - Optimized code for execution efficiency and memory management.

TRAINING & CERTIFICATIONS
• Computer Science & AI Academic Training — Babu Banarasi Das University
• Academic Foundations in Python, Data Structures and Machine Learning`;

      navigator.clipboard.writeText(resumePlainText)
        .then(() => showToast('Full Resume copied to clipboard!', 'success'))
        .catch(() => showToast('Failed to copy text', 'error'));
    });
  }
}

/* --------------------------------------------------------------------------
   Clipboard One-Click Copy Buttons
   -------------------------------------------------------------------------- */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-copy-label') || 'Information';

      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          showToast(`${label} copied to clipboard!`, 'success');
        })
        .catch(err => {
          console.error(err);
          showToast(`Could not copy ${label}`, 'error');
        });
    });
  });
}

/* --------------------------------------------------------------------------
   Contact Form Validation & Simulation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      contactForm.reset();
      showToast(`Thank you, ${name}! Your message has been prepared. Aman Deep will get back to you soon.`, 'success');
    }, 900);
  });
}

/* --------------------------------------------------------------------------
   Stat Counters Animation
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute('data-target'));
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const currentVal = Math.floor(progress * target);

          counter.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = `${prefix}${target}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>`;

  if (type === 'success') {
    icon = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>`;
  } else if (type === 'error') {
    icon = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>`;
  }

  toast.innerHTML = `
    <span>${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function escapeHtml(string) {
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
