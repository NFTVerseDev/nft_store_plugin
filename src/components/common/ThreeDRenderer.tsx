import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, useProgress } from '@react-three/drei';
import React, { Suspense, useEffect, useState, useTransition } from 'react';
import { FBXLoader } from 'three-stdlib';

// import { LinearProgress } from '@material-ui/core';

function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
}

export type ThreeDRendererProps = {
    className?: string;
    src: string;
};

const ThreeDRenderer = ({ src, className }: ThreeDRendererProps) => {
    const [isPending, startTransition] = useTransition();
    const [FBX, setFBX] = useState({});

    useEffect(() => {
        // @ts-ignore
        startTransition(() => void new FBXLoader().load(src, setFBX), [src]);
    }, [src]);

    return (
        <>
            {isPending ? (
                <div className="flex flex-col justify-center items-center h-[200px] w-[100%] text-white">
                    <div className="mb-[20px]">Loading...</div>
                    {/*<LinearProgress color="primary" style={{ width: '80%' }} />*/}
                </div>
            ) : (
                <div className={`${className}`}>
                    <Canvas camera={{ fov: 75, position: [300, 150, 300] }}>
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 2]} intensity={1.5} />
                            <primitive object={FBX} scale={0.27} dispose={null} />
                            <OrbitControls enablePan={true} enableRotate={true} enableZoom={true} />
                        </Suspense>
                    </Canvas>
                </div>
            )}
        </>
    );
};

export default ThreeDRenderer;
