import { Html, useProgress } from "@react-three/drei";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function CustomLoader() {
  const { progress } = useProgress();

  return (
    <Html fullscreen>
      <div className='w-screen h-screen bg-gradient-radial from-[#dfdfdf] to-[#cfcfcf] flex items-center justify-center'>
        <motion.div
          className='w-[300px] scale-100'
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className='rounded-2xl shadow-xl border border-[#1d1d1d]/10 bg-white/70 backdrop-blur'>
            <CardContent className='p-6 flex flex-col items-center gap-4'>
              <motion.div
                className='w-16 h-16 border-4 border-t-[#1d1d1d] border-r-transparent border-b-transparent border-l-transparent rounded-full'
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
              <Progress value={progress} className='w-full' />
              <div className='text-xs tracking-wider text-[#1d1d1d] font-mono'>
                Loading {Math.floor(progress)}%
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Html>
  );
}
