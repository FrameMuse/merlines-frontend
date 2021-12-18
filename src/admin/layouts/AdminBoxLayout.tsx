interface AdminBoxLayoutProps {
  header: string
  children: any
}

function AdminBoxLayout(props: AdminBoxLayoutProps) {
  return (
    <section className="admin-box-layout">
      <div className="admin-box-layout__header">{props.header}</div>
      <div className="admin-box-layout__container">{props.children}</div>
    </section>
  )
}

export default AdminBoxLayout
