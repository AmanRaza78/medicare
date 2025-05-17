import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useActionState, useEffect } from "react";
import { createPatient, PatientState } from "@/action/create-patient";

export default function OnboardingForm() {
  const initialState: PatientState = { status: undefined, message: "" };
  const [state, formAction, isPending] = useActionState(
    createPatient,
    initialState
  );

  useEffect(()=>{
    if(state.status === "success"){
      alert(state.message)
    }
    if(state.status === "error"){
      alert(state.message)
    }
  }, [state])

  return (
    <Card className="flex flex-col w-full p-4 shadow-lg mt-4 h-[600px] overflow-y-scroll">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Note: All fields are mandatory</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-y-4" action={formAction}>
          <div className="flex flex-col gap-y-2">
            <Label
              htmlFor="fullName"
              className="text-secondary-foreground text-sm"
            >
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              type="text"
            />
            {
              state?.errors?.["fullName"]?.[0] && (
                <p className="text-destructive">{state?.errors?.["fullName"]?.[0]}</p>
              )
            }
          </div>

          <div className="flex flex-col gap-y-2">
            <Label
              htmlFor="email"
              className="text-secondary-foreground text-sm"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="john.doe@example.com"
              type="email"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label
              htmlFor="phonenumber"
              className="text-secondary-foreground text-sm"
            >
              Phone Number
            </Label>
            <Input
              id="phonenumber"
              name="phonenumber"
              placeholder="1234567890"
              type="tel"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="gender" className="text-muted-secondary text-sm">
              Gender
            </Label>
            <Select name="gender">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHERS">Others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label
              htmlFor="address"
              className="text-secondary-foreground text-sm"
            >
              Address
            </Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Enter your address"
              rows={4}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label
              htmlFor="emergencyContactName"
              className="text-secondary-foreground text-sm"
            >
              Emergency Contact Name
            </Label>
            <Input
              id="emergencyContactName"
              name="emergencyContactName"
              placeholder="John Doe"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label
              htmlFor="emergencyContactNumber"
              className="text-secondary-foreground text-sm"
            >
              Emergency Contact Number
            </Label>
            <Input
              id="emergencyContactNumber"
              name="emergencyContactNumber"
              placeholder="1234567890"
              type="tel"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            {isPending ? (
              <Button disabled className="w-full">
                Submitting...
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Submit
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
