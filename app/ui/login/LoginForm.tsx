"use client";

import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "../../actions";
import { toast } from "sonner";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { SoftShadows } from "@react-three/drei";
import { useControls } from "leva";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;

    try {
      const response: any = await doCredentialLogin(email, password);

      if (!response?.error) {
        router.push("/home");
        router.refresh();
      }

      if (!response) {
        throw new Error("Network response was not ok");
      }

      // Process response here
      toast("Login Successful");
    } catch (error: any) {
      toast("Login Failed");
    }
  }

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  function Sphere({ position = [0, 0, 0], ...props }) {
    const ref = useRef();
    const factor = useMemo(() => 0.5 + Math.random(), []);
    useFrame((state) => {
      const t = easeInOutCubic(
        (1 + Math.sin(state.clock.getElapsedTime() * factor)) / 2
      );
      ref.current.position.y = position[1] + t * 4;
      ref.current.scale.y = 1 + t * 3;
    });
    return (
      <mesh ref={ref} position={position} {...props} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshLambertMaterial color="white" roughness={0} metalness={0.1} />
      </mesh>
    );
  }

  //   const { enabled, ...config } = useControls({
  //     enabled: true,
  //     size: { value: 25, min: 0, max: 100 },
  //     focus: { value: 0, min: 0, max: 2 },
  //     samples: { value: 10, min: 1, max: 20, step: 1 },
  //   });

  function Spheres({ number = 20 }) {
    const ref = useRef();
    const positions = useMemo(
      () =>
        [...new Array(number)].map(() => [
          3 - Math.random() * 6,
          Math.random() * 4,
          3 - Math.random() * 6,
        ]),
      []
    );
    useFrame(
      (state) =>
        (ref.current.rotation.y =
          Math.sin(state.clock.getElapsedTime() / 2) * Math.PI)
    );
    return (
      <group ref={ref}>
        {positions.map((pos, index) => (
          <Sphere key={index} position={pos} />
        ))}
      </group>
    );
  }

  return (
    <section className="p-4 w-full h-full">
      <div className="ml-3 mb-10">
        <Label className="grid text-3xl font-bold ">
          Ultium CAM Access Control System
        </Label>
      </div>
      <div className="ml-10 mr-10">
        <Label className="grid text-2xl font-bold">Login</Label>
        <Label className="ml-1">Login to access the website</Label>
      </div>
      <div className="flex mt-7 ml-10 mr-10">
        <div className="w-1/2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@ultiumcam.net"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-end">
                <Button type="submit">Login</Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="w-full h-96">
          <Canvas shadows camera={{ position: [-10, 5, 10], fov: 60 }}>
            <SoftShadows />
            <fog attach="fog" args={["white", 0, 40]} />
            <ambientLight intensity={0.5} />
            <directionalLight
              castShadow
              position={[2.5, 8, 5]}
              intensity={1.5}
              shadow-mapSize={1024}
            >
              <orthographicCamera
                attach="shadow-camera"
                args={[-10, 10, -10, 10, 0.1, 50]}
              />
            </directionalLight>
            <pointLight position={[-10, 0, -20]} color="white" intensity={1} />
            <pointLight position={[0, -10, 0]} intensity={1} />
            <group position={[0, -3.5, 0]}>
              <mesh receiveShadow castShadow>
                <boxGeometry args={[4, 1, 1]} />
                <meshLambertMaterial />
              </mesh>
              <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.5, 0]}
                receiveShadow
              >
                <planeGeometry args={[100, 100]} />
                <shadowMaterial transparent opacity={0.4} />
              </mesh>
              <Spheres />
            </group>
          </Canvas>
        </div>
      </div>
    </section>
  );
}
