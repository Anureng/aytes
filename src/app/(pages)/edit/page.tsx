"use client";
import React, { useState, useRef, useEffect } from "react";
import Groq from "groq-sdk";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EditPage = () => {

    const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true, });
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [blocks, setBlocks] = useState<
        { id: number; type: string; x: number; y: number; size: number; color: string; name: string }[]
    >([]);
    const [connections, setConnections] = useState<
        { id: number; start: number; end: number; name: string }[]
    >([]);
    const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isEditRouteOpen, setIsEditRouteOpen] = useState(false);

    const [dataEntries, setDataEntries] = useState<{ key: string; value: string }[]>([]);
    const [databaseUrl, setDatabaseUrl] = useState("");
    const [routeName, setRouteName] = useState("");

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        connections.forEach((connection) => {
            const startBlock = blocks.find((block) => block.id === connection.start);
            const endBlock = blocks.find((block) => block.id === connection.end);

            if (startBlock && endBlock) {
                ctx.beginPath();
                ctx.moveTo(startBlock.x + startBlock.size / 2, startBlock.y + startBlock.size / 2);
                ctx.lineTo(endBlock.x + endBlock.size / 2, endBlock.y + endBlock.size / 2);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw connection name
                const midX = (startBlock.x + endBlock.x) / 2;
                const midY = (startBlock.y + endBlock.y) / 2;

                ctx.fillStyle = "blue";
                ctx.font = "12px Arial";
                ctx.fillText(connection.name, midX, midY - 5);
            }
        });

        // Draw blocks
        blocks.forEach((block) => {
            ctx.fillStyle = block.color;
            ctx.fillRect(block.x, block.y, block.size, block.size);

            ctx.strokeStyle = selectedBlock === block.id ? "red" : "black";
            ctx.lineWidth = 2;
            ctx.strokeRect(block.x, block.y, block.size, block.size);

            ctx.fillStyle = "black";
            ctx.font = "12px Arial";
            ctx.fillText(block.name, block.x + 5, block.y + block.size + 15);
        });
    };

    const addBlock = (type: "server" | "database") => {
        const color = type === "server" ? "green" : "orange";
        const name = prompt(`Enter ${type} name:`) || `${type} ${blocks.length}`;
        setBlocks((prev) => [
            ...prev,
            {
                id: prev.length,
                type,
                x: Math.random() * 400 + 50,
                y: Math.random() * 300 + 50,
                size: 50,
                color,
                name,
            },
        ]);
    };

    const handleRouteSaveData = async () => {
        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [{
                    role: "user",
                    content: `Provide only the Node.js code for "${routeName}". Do not include any explanation or text. use arrow function . store in database this is database name userModel`
                }],
                model: "llama3-8b-8192",
            });
            const enhancedRouteName = chatCompletion.choices[0]?.message?.content?.trim() || routeName;
            setRouteName(enhancedRouteName);
            console.log("Route Name Saved:", enhancedRouteName);
        } catch (error) {
            console.error("Error with GROQ Chat Completion:", error);
        }
    };


    const handleBlockClick = (blockId: number) => {
        if (selectedBlock === null) {
            setSelectedBlock(blockId);
        } else if (selectedBlock !== blockId) {
            const connectionName = prompt("Enter connection name:") || `Connection ${connections.length}`;
            setConnections((prev) => [
                ...prev,
                { id: prev.length, start: selectedBlock, end: blockId, name: connectionName },
            ]);
            setSelectedBlock(null);
        } else {
            setSelectedBlock(null);
        }
    };

    const deleteBlock = (blockId: number) => {
        setBlocks((prev) => prev.filter((block) => block.id !== blockId));
        setConnections((prev) => prev.filter((conn) => conn.start !== blockId && conn.end !== blockId));
    };

    const openEditModal = () => setIsEditOpen(true);
    const openEditRouteModal = () => setIsEditRouteOpen(true);

    const handleCancel = () => {
        setIsEditOpen(false);
        setDataEntries([]);
        setDatabaseUrl("");
    };

    const handleRouteCancel = () => {
        setIsEditRouteOpen(false);
        setRouteName("");
    };

    const handleSave = () => {
        console.log("Data Entries:", dataEntries);
        console.log("Database URL:", databaseUrl);
        setIsEditOpen(false);
    };


    useEffect(() => {
        drawCanvas();
    }, [blocks, connections, selectedBlock]);

    return (
        <div>
            <h2>Block Connector</h2>
            <button onClick={() => addBlock("server")}>Add Server</button>
            <button onClick={() => addBlock("database")}>Add Database</button>
            <button onClick={() => selectedBlock !== null && deleteBlock(selectedBlock)}>
                Delete Selected Block
            </button>
            {selectedBlock !== null &&
                blocks[selectedBlock].type === "database" && (
                    <button onClick={openEditModal}>Edit Selected Block</button>
                )}
            {selectedBlock !== null &&
                blocks[selectedBlock].type === "database" && (
                    <button onClick={openEditRouteModal}>Edit Route</button>
                )}
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                style={{ border: "1px solid black", cursor: "pointer" }}
                onClick={(event) => {
                    const canvas = canvasRef.current;
                    if (!canvas) return;

                    const rect = canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;

                    const clickedBlock = blocks.find(
                        (block) =>
                            x >= block.x &&
                            x <= block.x + block.size &&
                            y >= block.y &&
                            y <= block.y + block.size
                    );

                    if (clickedBlock) handleBlockClick(clickedBlock.id);
                }}
            />
            {/* Edit Block Modal */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Block</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {dataEntries.map((entry, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Input
                                    placeholder="Key"
                                    value={entry.key}
                                    onChange={(e) =>
                                        setDataEntries((prev) =>
                                            prev.map((item, i) =>
                                                i === index ? { ...item, key: e.target.value } : item
                                            )
                                        )
                                    }
                                />
                                <Input
                                    placeholder="Value"
                                    value={entry.value}
                                    onChange={(e) =>
                                        setDataEntries((prev) =>
                                            prev.map((item, i) =>
                                                i === index ? { ...item, value: e.target.value } : item
                                            )
                                        )
                                    }
                                />
                                <Button
                                    variant="destructive"
                                    onClick={() => setDataEntries((prev) => prev.filter((_, i) => i !== index))}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button onClick={() => setDataEntries((prev) => [...prev, { key: "", value: "" }])}>
                            Add Data
                        </Button>
                        <Input
                            placeholder="Database URL"
                            value={databaseUrl}
                            onChange={(e) => setDatabaseUrl(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* Edit Route Modal */}
            <Dialog open={isEditRouteOpen} onOpenChange={setIsEditRouteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Route</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Route Name"
                        value={routeName}
                        onChange={(e) => setRouteName(e.target.value)}
                    />
                    {
                        routeName.length > 16 ? (
                            <Textarea value={routeName} style={{ height: "200px" }} />
                        ) : ""
                    }
                    <DialogFooter>
                        <Button variant="secondary" onClick={handleRouteCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleRouteSaveData}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditPage;
