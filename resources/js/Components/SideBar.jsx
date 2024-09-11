import React from "react";
import { Link } from '@inertiajs/react';
import { Typography, List, ListItem, ListItemPrefix, Card } from "@material-tailwind/react";
import { UserCircleIcon, PowerIcon, HomeIcon, UserIcon, UsersIcon, Squares2X2Icon, PresentationChartLineIcon, DocumentCheckIcon, CircleStackIcon, RadioIcon, RocketLaunchIcon, ListBulletIcon } from "@heroicons/react/24/solid";
import Logo from '../src/assests/pied-piper-removebg-preview.png';

export default function SideBar({ active }) {
  const isActive = (page) => (active === page ? "text-blue-600" : "");

  return (
    <div className="flex h-full min-h-screen"> {/* This ensures the sidebar stretches with the page */}
      <Card
        color="transparent"
        shadow={false}
        className="flex flex-col h-full min-h-screen w-64 p-4"
      >
        <div className="mb-2 flex items-center gap-4 p-4">
          <img src={Logo} alt="Illustration" className="h-11 w-20" />
          <Typography variant="h4" color="black">
            SkillTrack
          </Typography>
        </div>
        <List className="flex-grow"> {/* Flex-grow to take remaining space */}
          <Link href={route('home')}>
            <ListItem className={isActive("home")}>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Home Page
            </ListItem>
          </Link>
          <Link href={route('CourDetail')}>
            <ListItem className={isActive("CourDetail")}>
              <ListItemPrefix>
                <PresentationChartLineIcon className="h-5 w-5" />
              </ListItemPrefix>
              Course Tracking
            </ListItem>
          </Link>
          <Link href={route('KPIdash')}>
            <ListItem className={isActive("kpi")}>
              <ListItemPrefix>
                <DocumentCheckIcon className="h-5 w-5" />
              </ListItemPrefix>
              Select my KPI
            </ListItem>
          </Link>
          <Link href={route('dashboard')}>
            <ListItem className={isActive("dashboard")}>
              <ListItemPrefix>
                <Squares2X2Icon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
          <Link href={route('pred')}>
            <ListItem className={isActive("pred")}>
              <ListItemPrefix>
                <RocketLaunchIcon className="h-5 w-5" />
              </ListItemPrefix>
              Prediction AI
            </ListItem>
          </Link>
          <Link href={route('recom')}>
            <ListItem className={isActive("rec")}>
              <ListItemPrefix>
                <ListBulletIcon className="h-5 w-5" />
              </ListItemPrefix>
              Recommandation
            </ListItem>
          </Link>
        </List>
        <hr className="my-2 border-blue-gray-300" />
        <div className="mt-auto"> 
          <Link href={route('profile.edit')}>
            <ListItem className={isActive("profile")}>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
          </Link>
          <Link method="post" href={route('logout')}>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </Link>
        </div>
      </Card>
    </div>
  );
}
