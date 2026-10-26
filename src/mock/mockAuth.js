// User profiles and session state sourced from persistent disk data
import profileData from '../data/userProfile.json';

export const mockUsers = {
  student: profileData.studentUser,
  admin: profileData.adminUser
};

export const mockNotifications = [
  {
    id: "notif_1",
    title: "New Assessment Available",
    message: "Milestone quiz for Data Structures is ready to attempt.",
    time: "Today",
    read: false,
    type: "assessment"
  },
  {
    id: "notif_2",
    title: "Project Under Review",
    message: "Your project submission has been queued for faculty verification.",
    time: "Yesterday",
    read: true,
    type: "project"
  }
];
