import React from "react";
import { Card, CardBody, CardFooter, Input, Typography } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import ButtonMod from "@/Components/ButtonMod";

export default function ApplyC({ name }) {
  const [value, setValue] = React.useState("AI");

  return (
    <>
      <Card color="white" className="w-full max-w-[24rem] p-6 shadow-lg">
        <CardBody className="p-4">
          <div className="mb-6">
            <Typography variant="h6" color="blue-gray" className="mb-2">
            {name}
            </Typography>
            <Input label="id" size="lg" color="white" />
          </div>
          <div className="mb-6">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Full Name
            </Typography>
            <Input label="Full Name" size="lg" color="white" />
          </div>
          <div className="mb-6">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              My Courses
            </Typography>
            <Select
              label="Select Course"
              color="white"
              value={value}
              onChange={(val) => setValue(val)}
            >
              <Option value="AI">AI</Option>
              <Option value="BigData">Big Data</Option>
              <Option value="IOT">IOT</Option>
              <Option value="CloudComputing">Cloud Computing</Option>
              <Option value="DevOps">DevOps</Option>
              <Option value="Cybersecurity">Cybersecurity</Option>
            </Select>
          </div>
          <div className="mb-6">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Class-id
            </Typography>
            <Input
              type="text"
              label="Search"
              disabled
              className="w-full"
            />
          </div>
        </CardBody>
        <CardFooter className="p-0 flex justify-between">
          <ButtonMod  children={'Apply'} />
          <ButtonMod  children={'Cancel'} />
        </CardFooter>
      </Card>
    </>
  );
}
