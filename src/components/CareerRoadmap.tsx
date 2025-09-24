import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { CareerPath } from '../types';

interface CareerRoadmapProps {
  careerPaths: CareerPath[];
}

interface NodeData {
  id: string;
  name: string;
  type: 'user' | 'career' | 'skill';
  confidence?: number;
  skillType?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface LinkData {
  source: string;
  target: string;
  type: 'career' | 'skill';
}

export function CareerRoadmap({ careerPaths }: CareerRoadmapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || careerPaths.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    svg.attr("width", width).attr("height", height);

    // Create nodes and links
    const nodes: NodeData[] = [
      { id: 'user', name: 'You', type: 'user', fx: centerX, fy: centerY }
    ];

    const links: LinkData[] = [];

    // Add career nodes
    careerPaths.forEach((career, index) => {
      const angle = (index / careerPaths.length) * 2 * Math.PI;
      const radius = 150;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      nodes.push({
        id: career.id,
        name: career.title,
        type: 'career',
        confidence: career.confidence,
        x,
        y
      });

      links.push({
        source: 'user',
        target: career.id,
        type: 'career'
      });

      // Add top skills for each career
      const topSkills = career.requiredSkills
        .sort((a, b) => b.importance - a.importance)
        .slice(0, 3);

      topSkills.forEach((skill, skillIndex) => {
        const skillAngle = angle + (skillIndex - 1) * 0.3;
        const skillRadius = 220;
        const skillX = centerX + Math.cos(skillAngle) * skillRadius;
        const skillY = centerY + Math.sin(skillAngle) * skillRadius;

        const skillNodeId = `${career.id}_${skill.id}`;
        nodes.push({
          id: skillNodeId,
          name: skill.name,
          type: 'skill',
          skillType: skill.type,
          x: skillX,
          y: skillY
        });

        links.push({
          source: career.id,
          target: skillNodeId,
          type: 'skill'
        });
      });
    });

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(centerX, centerY))
      .force("collision", d3.forceCollide().radius(30));

    // Create gradient definitions
    const defs = svg.append("defs");
    
    const gradient = defs.append("radialGradient")
      .attr("id", "userGradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");
    
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "var(--primary)")
      .attr("stop-opacity", 1);
    
    gradient.append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "var(--secondary)")
      .attr("stop-opacity", 0.8);
    
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#fbbf24")
      .attr("stop-opacity", 0.3);

    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", (d) => d.type === 'career' ? "var(--primary)" : "var(--muted-foreground)")
      .attr("stroke-opacity", (d) => d.type === 'career' ? 0.8 : 0.4)
      .attr("stroke-width", (d) => d.type === 'career' ? 3 : 1.5)
      .attr("stroke-dasharray", (d) => d.type === 'skill' ? "5,5" : "none");

    // Create node groups
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .style("cursor", "pointer");

    // Add circles for nodes
    node.append("circle")
      .attr("r", (d) => {
        if (d.type === 'user') return 25;
        if (d.type === 'career') return 20;
        return 12;
      })
      .attr("fill", (d) => {
        if (d.type === 'user') return "url(#userGradient)";
        if (d.type === 'career') return "var(--primary)";
        if (d.skillType === 'technical') return "var(--primary)";
        if (d.skillType === 'soft') return "var(--secondary)";
        return "#fbbf24";
      })
      .attr("stroke", "var(--background)")
      .attr("stroke-width", 2)
      .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))");

    // Add confidence indicators for career nodes
    node.filter(d => d.type === 'career')
      .append("circle")
      .attr("r", 25)
      .attr("fill", "none")
      .attr("stroke", "var(--primary)")
      .attr("stroke-width", 3)
      .attr("stroke-opacity", 0.3)
      .attr("stroke-dasharray", function(d) {
        const circumference = 2 * Math.PI * 25;
        const percentage = (d.confidence || 0) / 100;
        return `${circumference * percentage} ${circumference}`;
      })
      .attr("stroke-dashoffset", 0)
      .style("transform", "rotate(-90deg)")
      .style("transform-origin", "center");

    // Add labels
    node.append("text")
      .text((d) => {
        if (d.type === 'user') return d.name;
        if (d.type === 'career') return d.name;
        return d.name.length > 12 ? d.name.substring(0, 12) + '...' : d.name;
      })
      .attr("text-anchor", "middle")
      .attr("dy", (d) => d.type === 'user' ? 35 : d.type === 'career' ? 30 : 20)
      .attr("fill", "var(--foreground)")
      .style("font-size", (d) => d.type === 'user' ? '14px' : d.type === 'career' ? '12px' : '10px')
      .style("font-weight", (d) => d.type === 'user' ? '600' : '500')
      .style("pointer-events", "none");

    // Add confidence percentage for career nodes
    node.filter(d => d.type === 'career')
      .append("text")
      .text(d => `${d.confidence}%`)
      .attr("text-anchor", "middle")
      .attr("dy", 4)
      .attr("fill", "var(--primary-foreground)")
      .style("font-size", "10px")
      .style("font-weight", "600")
      .style("pointer-events", "none");

    // Add hover effects
    node.on("mouseover", function(event, d) {
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("r", (d) => {
          if (d.type === 'user') return 28;
          if (d.type === 'career') return 23;
          return 15;
        });
      
      // Show tooltip
      const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background", "var(--popover)")
        .style("border", "1px solid var(--border)")
        .style("border-radius", "8px")
        .style("padding", "8px 12px")
        .style("font-size", "12px")
        .style("color", "var(--popover-foreground)")
        .style("box-shadow", "0 4px 6px rgba(0,0,0,0.1)")
        .style("z-index", "1000");

      if (d.type === 'career') {
        const career = careerPaths.find(c => c.id === d.id);
        tooltip.html(`
          <strong>${d.name}</strong><br/>
          Confidence: ${d.confidence}%<br/>
          ${career?.description}
        `);
      } else if (d.type === 'skill') {
        tooltip.html(`
          <strong>${d.name}</strong><br/>
          Type: ${d.skillType}<br/>
          Required skill
        `);
      } else {
        tooltip.html('<strong>Your Profile</strong><br/>Center of your career universe');
      }

      tooltip.transition()
        .duration(200)
        .style("opacity", 1);

      tooltip.style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", function() {
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("r", (d) => {
          if (d.type === 'user') return 25;
          if (d.type === 'career') return 20;
          return 12;
        });
      
      d3.selectAll(".tooltip").remove();
    });

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Add entrance animation
    node.style("opacity", 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .style("opacity", 1);

    link.style("opacity", 0)
      .transition()
      .duration(1000)
      .delay(500)
      .style("opacity", (d) => d.type === 'career' ? 0.8 : 0.4);

    return () => {
      simulation.stop();
    };
  }, [careerPaths]);

  return (
    <div className="w-full flex justify-center">
      <svg ref={svgRef} className="border border-border/20 rounded-lg bg-card/50"></svg>
    </div>
  );
}