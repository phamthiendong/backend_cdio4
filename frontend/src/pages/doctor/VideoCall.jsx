import { useEffect, useRef } from "react";
import { safeGet } from "@api/api.js";

export default function VideoCall({ appointmentId }){
  const ref = useRef();
  useEffect(()=>{
    (async ()=>{
      const {data} = await API.get(`/video/room/${appointmentId}`);
      const domain = import.meta.env.VITE_JITSI_DOMAIN || data.domain;
      const api = new window.JitsiMeetExternalAPI(domain, {
        parentNode: ref.current,
        roomName: data.room,
        userInfo: { displayName: "BookingCare User" }
      });
      return ()=> api.dispose();
    })();
  }, [appointmentId]);
  return <div ref={ref} style={{height: "75vh"}} />;
}
