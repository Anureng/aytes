"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


const CanvasPage = () => {
    const router = useRouter();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    interface CanvasObject {
        id: string;
        type: string;
        x: number;
        y: number;
        size: number;
        color: string;
    }

    interface Link {
        start: string;
        end: string;
    }

    const [objects, setObjects] = useState<CanvasObject[]>([]);
    const [links, setLinks] = useState<Link[]>([]);
    const [selectedObject, setSelectedObject] = useState<CanvasObject | null>(null);
    const [selectedLink, setSelectedLink] = useState<Link | null>(null);
    const [draggingObject, setDraggingObject] = useState<CanvasObject | null>(null);
    const [linkMode, setLinkMode] = useState(false);




    const drawCanvas = () => {
        const canvas = canvasRef?.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        links.forEach((link) => {
            const start = objects.find((obj) => obj?.id === link.start);
            const end = objects.find((obj) => obj.id === link.end);
            if (start && end) {
                ctx.beginPath();
                ctx.moveTo(start.x + start.size / 2, start.y + start.size / 2);
                ctx.lineTo(end.x + end.size / 2, end.y + end.size / 2);
                ctx.strokeStyle = selectedLink === link ? 'red' : 'black';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });

        objects.forEach((obj) => {
            ctx.fillStyle = obj.color;
            ctx.fillRect(obj.x, obj.y, obj.size, obj.size);
            if (obj === selectedObject) {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.strokeRect(obj.x, obj.y, obj.size, obj.size);
            }
        });
    };

    const addObject = (type: string) => {
        const newObject = {
            id: `obj-${objects.length}`,
            type,
            x: Math.random() * 400 + 50,
            y: Math.random() * 300 + 50,
            size: 50,
            color: type === 'rectangle' ? 'skyblue' : 'pink',
        };
        setObjects((prev) => [...prev, newObject]);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef?.current;
        if (!canvas) {
            console.warn("Canvas element is not available");
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const clickedLink = links.find((link) => {
            const start = objects.find((obj) => obj?.id === link.start);
            const end = objects.find((obj) => obj.id === link.end);
            if (start && end) {
                const distance = Math.abs(
                    (end.y - start.y) * x - (end.x - start.x) * y + end.x * start.y - end.y * start.x
                ) / Math.hypot(end.x - start.x, end.y - start.y);
                return distance < 5;
            }
            return false;
        });

        if (clickedLink) {
            setSelectedLink(clickedLink);
            setSelectedObject(null);
        } else {
            setSelectedLink(null);
            const clickedObject = objects.find(
                (obj) => x >= obj.x && x <= obj.x + obj.size && y >= obj.y && y <= obj.y + obj.size
            );
            if (clickedObject) {
                if (linkMode && selectedObject && selectedObject.id !== clickedObject.id) {
                    setLinks((prevLinks) => [
                        ...prevLinks,
                        { start: selectedObject.id, end: clickedObject.id }
                    ]);
                    setSelectedObject(null);
                } else {
                    setSelectedObject(clickedObject);
                    setDraggingObject(clickedObject);
                }
            } else {
                setSelectedObject(null);
            }
        }
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!draggingObject) return;


        const canvas = canvasRef.current;
        if (!canvas) {
            console.warn("Canvas element is not available");
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setObjects((prevObjects) =>
            prevObjects.map((obj) =>
                obj.id === draggingObject.id ? { ...obj, x: x - obj.size / 2, y: y - obj.size / 2 } : obj
            )
        );
    };

    const handleMouseUp = () => {
        setDraggingObject(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Backspace') {
            if (selectedObject) {
                setObjects((prevObjects) => prevObjects.filter((obj) => obj.id !== selectedObject.id));
                setSelectedObject(null);
            } else if (selectedLink) {
                setLinks((prevLinks) => prevLinks.filter((link) => link !== selectedLink));
                setSelectedLink(null);
            }
        }
    };

    const toggleLinkMode = () => {
        setLinkMode((prevMode) => !prevMode);
        setSelectedObject(null);
        setSelectedLink(null);
    };

    const handleEditClick = () => {
        router.push('/edit');
    };

    useEffect(() => {
        drawCanvas();
    }, [objects, links, selectedObject, selectedLink]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedObject, selectedLink]);

    return (
        <div>
            <button onClick={() => addObject('rectangle')}>Add Rectangle</button>
            <button onClick={() => addObject('cylinder')}>Add Cylinder</button>
            <button onClick={toggleLinkMode} style={{ backgroundColor: linkMode ? 'lightgreen' : '' }}>
                {linkMode ? 'Exit Link Mode' : 'Enter Link Mode'}
            </button>
            {selectedObject && selectedObject.color === 'skyblue' && (
                <button onClick={handleEditClick}>Edit</button>
            )}
            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                style={{ border: '1px solid black', cursor: 'pointer' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
        </div>
    );
};

export default CanvasPage;
