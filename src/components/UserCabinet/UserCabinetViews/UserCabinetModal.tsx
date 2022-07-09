import React from "react"

import useLocalization from "../../../plugins/localization/hook"
import Modal from "../../Modal/Modal"

interface props {
  visible: boolean
  handleOk: () => void
  handleCancel: () => void
}

const UserCabinetModal: React.FC<props> = ({ visible, handleCancel, handleOk }) => {
  const ll = useLocalization(ll => ll)
  return (
    <Modal maxWidth="32em" visible={visible} onCancel={handleCancel}>
      <div className={"cabinet__history-delete-wrap"}>
        <p className={"cabinet__history-delete-text"}>
          {ll.lk.clearHistoryTitle}
        </p>
        <div className={"cabinet__history-delete-buttons"}>
          <button className={"cabinet__history-delete-submit"} onClick={handleOk}>
            {ll.lk.delete}
          </button>
          <button className={"cabinet__history-delete-cancel"} onClick={handleCancel}>
            {ll.lk.cancelDelete}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default UserCabinetModal
