import React, { useRef, useState, useEffect } from 'react';
import { CertificateElement, CertificateTemplateConfig } from '@/types/certificate';
import { cn } from '@/lib/utils';
import QRCode from 'react-qr-code';

interface CertificateCanvasProps {
    config: CertificateTemplateConfig;
    selectedElementId: string | null;
    onSelectElement: (id: string | null) => void;
    onUpdateElement: (id: string, updates: Partial<CertificateElement>) => void;
    zoom?: number;
}

export function CertificateCanvas({
    config,
    selectedElementId,
    onSelectElement,
    onUpdateElement,
    zoom = 1,
}: CertificateCanvasProps) {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [editingElementId, setEditingElementId] = useState<string | null>(null);
    const [editingContent, setEditingContent] = useState('');

    // Helper to determine if we are interacting with a resize handle vs dragging the element
    // For now, we only implement basic dragging. Resizing handles can be added next.

    const handleMouseDown = (e: React.MouseEvent, element: CertificateElement) => {
        e.stopPropagation();
        onSelectElement(element.id);
        setIsDragging(true);

        const startX = e.clientX;
        const startY = e.clientY;
        const initialElementX = element.x;
        const initialElementY = element.y;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = (moveEvent.clientX - startX) / zoom;
            const deltaY = (moveEvent.clientY - startY) / zoom;

            onUpdateElement(element.id, {
                x: initialElementX + deltaX,
                y: initialElementY + deltaY,
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleDoubleClick = (e: React.MouseEvent, element: CertificateElement) => {
        e.stopPropagation();
        if (element.type === 'text' || element.type === 'variable') {
            setEditingElementId(element.id);
            setEditingContent(element.content);
        }
    };

    const handleEditBlur = () => {
        if (editingElementId) {
            onUpdateElement(editingElementId, { content: editingContent });
            setEditingElementId(null);
            setEditingContent('');
        }
    };

    const handleEditKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleEditBlur();
        } else if (e.key === 'Escape') {
            setEditingElementId(null);
            setEditingContent('');
        }
    };

    return (
        <div
            className="relative shadow-2xl bg-white overflow-hidden transition-all duration-200 ease-in-out"
            style={{
                width: config.canvas.width * zoom,
                height: config.canvas.height * zoom,
                backgroundColor: config.canvas.backgroundColor,
                backgroundImage: config.canvas.backgroundImage ? `url(${config.canvas.backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            onClick={() => onSelectElement(null)}
            ref={canvasRef}
        >
            {config.elements.map((element) => (
                <div
                    key={element.id}
                    className={cn(
                        "absolute cursor-move select-none group",
                        selectedElementId === element.id ? "ring-2 ring-primary ring-offset-1" : "hover:ring-1 hover:ring-primary/50"
                    )}
                    style={{
                        left: element.x * zoom,
                        top: element.y * zoom,
                        width: element.width ? element.width * zoom : 'auto',
                        height: element.height ? element.height * zoom : 'auto',
                        fontFamily: element.style.fontFamily,
                        fontSize: (element.style.fontSize || 16) * zoom,
                        fontWeight: element.style.fontWeight,
                        fontStyle: element.style.fontStyle,
                        color: element.style.color,
                        textAlign: element.style.textAlign,
                        opacity: element.style.opacity,
                        textTransform: element.style.textTransform,
                        letterSpacing: element.style.letterSpacing ? `${element.style.letterSpacing}px` : undefined,
                        lineHeight: element.style.lineHeight,
                        transform: 'translate(-50%, -50%)', // Center align the point
                    }}
                    onMouseDown={(e) => handleMouseDown(e, element)}
                    onDoubleClick={(e) => handleDoubleClick(e, element)}
                >
                    {element.type === 'image' ? (
                        <img
                            src={element.content}
                            alt="Certificate Element"
                            className="w-full h-full object-contain pointer-events-none"
                            draggable={false}
                        />
                    ) : element.type === 'qrcode' ? (
                        <div className="bg-white p-1">
                            <QRCode
                                value={element.content || 'https://example.com'}
                                size={element.width ? element.width * zoom : 64 * zoom}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    ) : editingElementId === element.id ? (
                        <input
                            type="text"
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            onBlur={handleEditBlur}
                            onKeyDown={handleEditKeyDown}
                            autoFocus
                            className="bg-transparent border-2 border-primary outline-none px-1"
                            style={{
                                width: '100%',
                                fontFamily: 'inherit',
                                fontSize: 'inherit',
                                fontWeight: 'inherit',
                                fontStyle: 'inherit',
                                color: 'inherit',
                                textAlign: 'inherit',
                            }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                        />
                    ) : (
                        // Text or Variable
                        <span className="whitespace-nowrap">{element.content}</span>
                    )}
                </div>
            ))}

            {config.elements.length === 0 && !config.canvas.backgroundImage && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 select-none pointer-events-none">
                    <p>Drag and drop elements or upload a background</p>
                </div>
            )}
        </div>
    );
}
