interface AdminSectionLayoutProps {
  header: string
  children: any
}

function AdminSectionLayout(props: AdminSectionLayoutProps) {
  return (
    <section className="admin-section-layout">
      <h3 className="admin-section-layout__header">{props.header}</h3>
      <div className="admin-section-layout__container">{props.children}</div>
    </section>
  )
}

export default AdminSectionLayout
