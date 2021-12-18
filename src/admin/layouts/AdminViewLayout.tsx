interface AdminViewLayoutProps {
  title: string
  children: any
}

function AdminViewLayout(props: AdminViewLayoutProps) {
  return (
    <div className="admin-view-layout">
      <h1 className="admin-view-layout__title">{props.title}</h1>
      <div className="admin-view-layout__container">{props.children}</div>
    </div>
  )
}

export default AdminViewLayout
