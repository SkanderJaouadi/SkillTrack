import StudentM from "@/src/assests/undraw_Pic_profile_re_7g2h.png";
import StudentF from "@/src/assests/undraw_Profile_pic_re_iwgo.png";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import PrimaryButton from "@/Components/PrimaryButton";

const niveauColors = {
  poor: 'text-red-500',
  medium: 'text-orange-500',
  good: 'text-green-500',
  verygood: 'text-blue-500',
};

const circleColors = {
  poor: 'bg-red-500',
  medium: 'bg-orange-500',
  good: 'bg-green-500',
  verygood: 'bg-blue-500',
};

export default function StudentCard({ name, sexe, prenom, niveau }) {
  const isFemale = sexe === 'F';
  // Trim and convert niveau to lowercase for consistent matching
  const cleanedNiveau = niveau.trim().toLowerCase().replace(/\s+/g, '');
  const niveauClass = niveauColors[cleanedNiveau] || 'text-gray-500';
  const circleClass = circleColors[cleanedNiveau] || 'bg-gray-500';

  return (
    <Card className="w-60 mb-8">
      <CardHeader>
        {/* Optional header content */}
      </CardHeader>
      <img
        src={isFemale ? StudentF : StudentM}
        alt="profile-picture"
        className="mx-auto mt-4"
      />
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {name} {prenom}
        </Typography>
        <div className="flex items-center justify-center space-x-2">
          <span
            className={`w-4 h-4 rounded-full ${circleClass}`}
          ></span>
          <Typography className={`font-medium ${niveauClass}`} textGradient>
            {niveau}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <PrimaryButton children={'View report'} />
      </CardFooter>
    </Card>
  );
}
