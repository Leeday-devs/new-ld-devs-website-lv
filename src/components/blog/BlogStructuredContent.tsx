import DOMPurify from 'dompurify';
import { 
  BlogTitle, 
  BlogIntro, 
  BlogSubheading, 
  BlogActionItems, 
  BlogConclusion,
  EnhancedSubheading,
  ActionList,
  ActionCTA
} from './BlogContentStructure';

interface BlogStructuredContentProps {
  content: string;
  title: string;
}

export const BlogStructuredContent = ({ content, title }: BlogStructuredContentProps) => {
  // Parse the HTML content and wrap it in structured components
  const parseAndStructureContent = (htmlContent: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = DOMPurify.sanitize(htmlContent, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'id'],
      ALLOW_DATA_ATTR: false
    });

    const elements = Array.from(tempDiv.children);
    const structuredContent: JSX.Element[] = [];
    let currentSection: 'intro' | 'content' | 'conclusion' = 'intro';
    let sectionContent: HTMLElement[] = [];
    let subheadingCount = 0;

    const flushSection = () => {
      if (sectionContent.length === 0) return;
      
      const sectionHtml = sectionContent.map(el => el.outerHTML).join('');
      
      switch (currentSection) {
        case 'intro':
          structuredContent.push(
            <BlogIntro key={`intro-${structuredContent.length}`}>
              <div dangerouslySetInnerHTML={{ __html: sectionHtml }} />
            </BlogIntro>
          );
          break;
        case 'content':
          if (sectionContent.some(el => el.tagName === 'UL' || el.tagName === 'OL')) {
            structuredContent.push(
              <BlogActionItems key={`actions-${structuredContent.length}`}>
                <div dangerouslySetInnerHTML={{ __html: sectionHtml }} />
              </BlogActionItems>
            );
          } else {
            structuredContent.push(
              <div key={`content-${structuredContent.length}`} className="mb-6">
                <div dangerouslySetInnerHTML={{ __html: sectionHtml }} />
              </div>
            );
          }
          break;
        case 'conclusion':
          structuredContent.push(
            <BlogConclusion key={`conclusion-${structuredContent.length}`}>
              <div dangerouslySetInnerHTML={{ __html: sectionHtml }} />
              <ActionCTA 
                question="Ready to transform your business with these strategies?"
                primaryAction={{ text: "Get Started Today", href: "/contact" }}
                secondaryAction={{ text: "Learn More", href: "/services" }}
              />
            </BlogConclusion>
          );
          break;
      }
      
      sectionContent = [];
    };

    elements.forEach((element, index) => {
      const tagName = element.tagName.toLowerCase();
      const textContent = element.textContent?.toLowerCase() || '';
      
      // Detect section transitions
      if (tagName === 'h2' || tagName === 'h3') {
        flushSection();
        
        // Check if this looks like a conclusion
        if (textContent.includes('conclusion') || 
            textContent.includes('summary') || 
            textContent.includes('takeaway') ||
            textContent.includes('final') ||
            index > elements.length * 0.8) {
          currentSection = 'conclusion';
        } else if (currentSection === 'intro') {
          currentSection = 'content';
        }
        
        // Add the subheading with enhanced styling
        subheadingCount++;
        structuredContent.push(
          <BlogSubheading key={`subheading-${structuredContent.length}`}>
            <EnhancedSubheading 
              title={element.textContent || ''}
              number={subheadingCount}
            />
          </BlogSubheading>
        );
        return;
      }
      
      sectionContent.push(element as HTMLElement);
    });
    
    // Flush remaining content
    flushSection();
    
    return structuredContent;
  };

  return (
    <div className="blog-structured-content">      
      {/* Structured Content */}
      {parseAndStructureContent(content)}
    </div>
  );
};