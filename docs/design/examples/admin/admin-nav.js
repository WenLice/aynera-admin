/**
 * Shared admin mockup sidebar. Set data-active on <aside class="sidebar">.
 * Values: dashboard | applicants | members | cohorts | curator | introductions
 *         safety | audit | policy | metrics | waitlist | moderation | staff
 *         comms | relationships | tools | grievances | system
 */
(function () {
  const items = [
    { section: "Command" },
    { id: "dashboard", href: "adm-02-dashboard.html", icon: "◈", label: "Dashboard" },
    { id: "metrics", href: "adm-14-pilot-metrics.html", icon: "▣", label: "Pilot metrics" },
    { id: "system", href: "adm-23-system-controls.html", icon: "⏻", label: "System controls" },
    { section: "Growth" },
    { id: "waitlist", href: "adm-15-waitlist-cities.html", icon: "◌", label: "Waitlist & cities" },
    { id: "applicants", href: "adm-03-applicant-queue.html", icon: "◎", label: "Applicants" },
    { id: "members", href: "adm-07-member-detail.html", icon: "◉", label: "Members" },
    { id: "member-control", href: "adm-16-member-control.html", icon: "⚙", label: "Member control" },
    { section: "Supply" },
    { id: "cohorts", href: "adm-06-cohort-dashboard.html", icon: "▦", label: "Cohorts" },
    { id: "curator", href: "adm-08-curator-workspace.html", icon: "✦", label: "Curator" },
    { id: "introductions", href: "adm-09-introduction-detail.html", icon: "⇄", label: "Introductions" },
    { id: "relationships", href: "adm-20-relationship-oversight.html", icon: "⚭", label: "Relationships" },
    { section: "Trust" },
    { id: "safety", href: "adm-10-safety-queue.html", icon: "⚠", label: "Safety" },
    { id: "moderation", href: "adm-17-moderation-inbox.html", icon: "▦", label: "Moderation" },
    { id: "grievances", href: "adm-22-grievance-inbox.html", icon: "✉", label: "Grievances" },
    { section: "Ops" },
    { id: "comms", href: "adm-19-comms-templates.html", icon: "✎", label: "Comms" },
    { id: "tools", href: "adm-21-tools-exports.html", icon: "⇩", label: "Tools & exports" },
    { id: "staff", href: "adm-18-staff-roles.html", icon: "♟", label: "Staff & roles" },
    { id: "audit", href: "adm-13-audit-log.html", icon: "☰", label: "Audit" },
    { id: "policy", href: "adm-12-policy-versions.html", icon: "§", label: "Policy" },
  ];

  const aside = document.querySelector("aside.sidebar");
  if (!aside) return;
  const active = aside.getAttribute("data-active") || "";

  let html = `
    <div class="brand">
      <div class="brand-mark"></div>
      <div class="brand-text">
        <div class="brand-name"><span class="el">El</span><span class="aris">Aris</span></div>
        <div class="brand-sub">Command center</div>
      </div>
    </div>
    <nav class="nav">
  `;

  for (const item of items) {
    if (item.section) {
      html += `<div class="nav-section">${item.section}</div>`;
      continue;
    }
    const cls = item.id === active ? " active" : "";
    html += `<a class="${cls.trim()}" href="${item.href}"><span class="nav-icon">${item.icon}</span> ${item.label}</a>`;
  }

  html += `
    </nav>
    <div class="sidebar-foot"><a href="index.html" style="color:inherit;">Mockup gallery</a></div>
  `;

  aside.innerHTML = html;
})();
