import useNotificationStore from "../stores/useNotificationStore";
import base58 from "bs58";

export function notify(newNotification: {
  type?: string
  message: string
  description?: string
  txid?: string
}) {
  const {
    notifications,
    set: setNotificationStore,
  } = useNotificationStore.getState()

  setNotificationStore((state: { notifications: any[] }) => {
    state.notifications = [
      ...notifications,
      { type: 'success', ...newNotification },
    ]
  })
}

export function makeSecretKey( key: String ){
  if( key[0] == '[' ){
    let len = key.length;
    let str = key.substring(1, len - 1);
    let i = 0, rlt = [];
    let list = str.split(',');
    rlt = list.map((item: String) => {
      return parseInt(item.toString())
    })
    return Uint8Array.from(rlt);
  }
  return base58.decode(key.toString());
}