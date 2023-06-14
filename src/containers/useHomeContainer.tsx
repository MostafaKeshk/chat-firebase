import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import { useFormik } from "formik";
import { roomSchema } from "../validations/room";
import { db } from "../config/firebase";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  query,
  updateDoc,
  getDoc,
  arrayUnion,
  where,
} from "firebase/firestore";

interface Room {
  id: string;
  messages: Message[];
}

interface Message {
  name: string;
  phoneNumber: string;
  createdAt: Date;
  text: string;
}

const useHomeContainer = () => {
  const { user } = useAuth();
  const { setErrorMessage } = useAlert();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const [room, setRoom] = useState<Room>({ id: "", messages: [] });
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomMessages, setRoomMessages] = useState<Message[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [roomLoading, setRoomLoading] = useState<boolean>(false);

  const handleCreateJoinRoom = async (values: { name: string }) => {
    const docRef = doc(db, "Rooms", values.name);
    const docSnap = await getDoc(docRef);
    setRoomLoading(true);
    try {
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          users: arrayUnion(user.uid),
        });
      } else {
        await setDoc(docRef, {
          users: [user.uid],
          messages: [],
        });
      }

      roomFormik.setFieldValue("name", "");
      setOpenDialog(false);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setRoomLoading(false);
    }
  };

  const roomFormik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: roomSchema,
    onSubmit: (values: any) => handleCreateJoinRoom(values),
  });

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSend = async () => {
    setMessageText("");

    await updateDoc(doc(db, "Rooms", room.id), {
      messages: arrayUnion({
        uid: user.uid,
        name: user.displayName,
        phoneNumber: user.phoneNumber,
        createdAt: new Date(),
        text: messageText,
      }),
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const q = query(
      collection(db, "Rooms"),
      where("users", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedRooms: Room[] = [];
      querySnapshot.forEach((doc) => {
        updatedRooms.push({ id: doc.id, ...doc.data() } as Room);
      });

      setRooms(updatedRooms);

      if (room.id) {
        const selectedRoom = updatedRooms.find((r) => r.id === room.id);
        const msgs = selectedRoom ? selectedRoom.messages : [];
        setRoomMessages(msgs);
      }

      setTimeout(() => scrollToBottom(), 100);
    });

    return () => unsubscribe();
  }, [user.uid, room.id]);

  const handleSelectRoom = (selectedRoom: Room) => {
    setRoom(selectedRoom);

    const selectedRoomData = rooms.find((r) => r.id === selectedRoom.id);
    const msgs = selectedRoomData ? selectedRoomData.messages : [];
    setRoomMessages(msgs);
  };

  return {
    handleDrawerToggle,
    mobileOpen,
    rooms,
    room,
    handleSelectRoom,
    roomMessages,

    handleSend,
    openDialog,
    setOpenDialog,
    roomLoading,
    roomFormik,
    messageText,
    setMessageText,
    messagesEndRef,
  };
};

export default useHomeContainer;
