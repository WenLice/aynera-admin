import { ReactNode } from "react";

type DetailWithAuditProps = {
  details: ReactNode;
  audit: ReactNode;
};

/** Equal split: entity details | audit trail. Use on detail panes, not list pages. */
export function DetailWithAudit({ details, audit }: DetailWithAuditProps) {
  return (
    <div className="detail-with-audit">
      <div className="detail-with-audit-main stack">{details}</div>
      <aside className="detail-with-audit-rail sticky-rail">{audit}</aside>
    </div>
  );
}
