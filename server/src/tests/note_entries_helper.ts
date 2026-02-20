import pool from "../../db/pool";

const defaultNotes = [
  {
    title: "Review SQL",
    content: "Spend about an hour reviewing basic syntax for SQL"
  },
  {
    title: "Novel Ideas",
    content: "Maybe write a novel about a young hero who is just trying to get his old life back after downfall"
  },
  {
    title: "Morning Routine",
    content: "Design a consistent morning routine that includes journaling, stretching, and planning the day ahead."
  },
  {
    title: "Startup Idea",
    content: "Brainstorm a SaaS platform that helps freelancers manage contracts, invoices, and client communication."
  },
  {
    title: "Study Plan",
    content: "Outline a two-week study plan to review database normalization and indexing strategies."
  },
  {
    title: "Healthy Habits",
    content: "Track water intake daily and aim to drink at least eight glasses per day."
  },
  {
    title: "Creative Writing",
    content: "Draft a short story about a city where memories can be bought and sold legally."
  },
  {
    title: "Career Goals",
    content: "List three technical skills to improve this quarter and set measurable milestones."
  },
  {
    title: "Weekend Project",
    content: "Build a small REST API using Node.js and connect it to a PostgreSQL database."
  },
  {
    title: "Financial Goals",
    content: "Set a savings target for the next six months and automate monthly transfers."
  },
  {
    title: "Book Summary",
    content: "Summarize key insights from a recent non-fiction book and highlight actionable takeaways."
  },
  {
    title: "Meditation Practice",
    content: "Start with 10 minutes of guided meditation each evening to reduce stress and improve focus."
  },
  {
    title: "One Good App",
    content: "Keep working on the app idea!"
  },
  {
    title: "Don't give up",
    content: "I know things are hard and frustrating. However, refuse to give up! If things are hard, take a break, work on something else, and then come back to it!"
  }
];

const resetTable = async () => {
  await pool.query(
    `
      TRUNCATE TABLE note_entries RESTART IDENTITY;
    `
  );
};

// const insertNoteEntry = async () => {

// };

export default { defaultNotes, resetTable };