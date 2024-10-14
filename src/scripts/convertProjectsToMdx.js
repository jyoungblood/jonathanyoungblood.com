import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the projects data
let projects;
try {
  const projectsData = await import('../data/projects.js');
  projects = projectsData.projects; // Use the named export 'projects'

  if (!Array.isArray(projects)) {
    throw new Error('Projects data is not an array');
  }
} catch (error) {
  console.error('Error importing projects data:', error);
  process.exit(1);
}

// Create the projects directory if it doesn't exist
const projectsDir = path.join(__dirname, '..', 'content', 'projects');
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// Function to convert a string to kebab-case
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Convert each project to an MDX file
projects.forEach((project) => {
  const fileName = `${toKebabCase(project.title)}.mdx`;
  const filePath = path.join(projectsDir, fileName);

  // Create the frontmatter content
  const frontmatter = `---
title: "${project.title}"
description: "${project.description}"
${project.url ? `url: "${project.url}"` : ''}
${project.tags && project.tags.length > 0 ? `tags: [${project.tags.map(tag => `"${tag}"`).join(', ')}]` : ''}
${project.collections && project.collections.length > 0 ? `collections: [${project.collections.map(collection => `"${collection}"`).join(', ')}]` : ''}
${project.year ? `year: "${project.year}"` : ''}
${project.status ? `status: "${project.status}"` : ''}
${project.hidden !== undefined ? `hidden: ${project.hidden}` : ''}
${project.icon ? `icon: "${project.icon}"` : ''}
---

${project.description}

`;

  // Write the MDX file
  fs.writeFileSync(filePath, frontmatter);
  console.log(`Created ${fileName}`);
});

console.log('Conversion complete!');
