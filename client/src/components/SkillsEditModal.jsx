import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    UploadCloud,
    File,
    Code,
    Briefcase,
    PenTool,
    Music,
    Globe,
    Terminal,
    Shapes,
} from "lucide-react";
import { Input, Textarea } from "./ui/Primitives";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const categories = [
    { value: "development", label: "Development", icon: Code },
    { value: "Programming Language", label: "Programming Language", icon: Terminal },
    { value: "design", label: "Design", icon: PenTool },
    { value: "music", label: "Music", icon: Music },
    { value: "language", label: "Language", icon: Globe },
    { value: "business", label: "Business", icon: Briefcase },
    { value: "Other", label: "Other", icon: Shapes },
];

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

export const SkillsEditModal = ({ isOpen, onClose, type, initialData, onSave }) => {
    const [formData, setFormData] = useState({
        title: "",
        name: "", // used for wanted skills
        category: "",
        level: "Intermediate",
        description: "",
        file: null,
    });
    const [errors, setErrors] = useState({});
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    ...initialData,
                    title: initialData.title || initialData.name || "",
                    name: initialData.name || initialData.title || ""
                });
            } else {
                setFormData({
                    title: "",
                    name: "",
                    category: "",
                    level: "Intermediate",
                    description: "",
                    file: null,
                });
            }
            setErrors({});
        }
    }, [isOpen, initialData, type]);

    const validate = () => {
        const errs = {};
        const nameField = type === "offered" ? formData.title : formData.name;

        if (!nameField?.trim()) {
            if (type === "offered") errs.title = "Skill name is required";
            else errs.name = "Skill name is required";
        }

        if (type === "offered" && !formData.category) {
            errs.category = "Category is required";
        }

        if (nameField?.length > 20) {
            if (type === "offered") errs.title = "Skill name must be at most 20 characters";
            else errs.name = "Skill name must be at most 20 characters";
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const savedData = {
            ...formData,
            // Normalize name/title based on type for consistency with existing data structure
            ...(type === "offered" ? { title: formData.title } : { name: formData.name }),
        };
        // clean up redundant fields if needed, but keeping them doesn't hurt

        onSave(savedData);
        onClose();
    };

    const handleFileSelect = (file) => {
        // Basic validation
        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, file: "File size must be less than 5MB" }));
            return;
        }
        setFormData((prev) => ({ ...prev, file }));
        setErrors((prev) => {
            const { file: _, ...rest } = prev;
            return rest;
        });
    };

    // Drag and drop handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto flex flex-col">
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                                <h2 className="text-xl font-semibold text-zinc-900">
                                    {initialData ? "Edit Skill" : "Add New Skill"}
                                    <span className="ml-2 text-sm font-normal text-muted-foreground capitalize">
                                        ({type === "offered" ? "Offered" : "Wanted"})
                                    </span>
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-zinc-500" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                                {/* Name Field */}
                                <div className="space-y-1.5">
                                    <Label>Skill Name</Label>
                                    <Input
                                        placeholder={type === "offered" ? "e.g. Python Programming" : "e.g. Learn Spanish"}
                                        value={type === "offered" ? formData.title : formData.name}
                                        maxLength={40}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                title: e.target.value,
                                                name: e.target.value,
                                            }))
                                        }
                                        className={errors.title || errors.name ? "border-red-500" : ""}
                                    />
                                    {(errors.title || errors.name) && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.title || errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Category - Only for Offered */}
                                {type === "offered" && (
                                    <div className="space-y-1.5">
                                        <Label>Category</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) =>
                                                setFormData((prev) => ({ ...prev, category: value }))
                                            }
                                        >
                                            <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((cat) => (
                                                    <SelectItem key={cat.value} value={cat.value}>
                                                        <div className="flex items-center gap-2">
                                                            {cat.icon && <cat.icon className="w-4 h-4" />}
                                                            {cat.label}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.category && (
                                            <p className="text-xs text-red-500 mt-1">{errors.category}</p>
                                        )}
                                    </div>
                                )}

                                {/* Level */}
                                <div className="space-y-1.5">
                                    <Label>{type === "offered" ? "Proficiency Level" : "Desired Level"}</Label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {levels.map((lvl) => (
                                            <button
                                                key={lvl}
                                                onClick={() => setFormData((prev) => ({ ...prev, level: lvl }))}
                                                className={`text-xs sm:text-sm px-2 py-2 rounded-lg border transition-all ${formData.level === lvl
                                                    ? "bg-zinc-800 text-white border-zinc-800"
                                                    : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                                                    }`}
                                            >
                                                {lvl}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Description - Only for Offered */}
                                {type === "offered" && (
                                    <div className="space-y-1.5">
                                        <Label>Description</Label>
                                        <Textarea
                                            placeholder="Briefly describe your experience..."
                                            value={formData.description || ""}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, description: e.target.value }))
                                            }
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                )}

                                {/* File Upload - Only for Offered */}
                                {type === "offered" && (
                                    <div className="space-y-1.5">
                                        <Label>Certifications (Optional)</Label>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".svg,.png,.jpg,.jpeg,.pdf"
                                            className="hidden"
                                            onChange={(e) =>
                                                e.target.files?.[0] && handleFileSelect(e.target.files[0])
                                            }
                                        />

                                        {formData.file ? (
                                            <div className="border border-zinc-200 bg-zinc-50 rounded-lg p-3 flex items-center justify-between">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-8 h-8 rounded bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 shrink-0">
                                                        <File size={16} />
                                                    </div>
                                                    <div className="truncate">
                                                        <p className="text-sm font-medium text-zinc-900 truncate">
                                                            {formData.file.name}
                                                        </p>
                                                        <p className="text-xs text-zinc-500">
                                                            {(formData.file.size / 1024).toFixed(2)} KB
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setFormData((prev) => ({ ...prev, file: null }))}
                                                    className="p-1 hover:bg-zinc-200 rounded-full text-zinc-500 hover:text-red-500 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : formData.certificateURL ? (
                                            <div className="border border-zinc-200 bg-zinc-50 rounded-lg p-3 flex items-center justify-between">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-8 h-8 rounded bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 shrink-0 overflow-hidden">
                                                        <img src={formData.certificateURL} alt="cert" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="truncate">
                                                        <p className="text-sm font-medium text-zinc-900 truncate">
                                                            Current Certificate
                                                        </p>
                                                        <a href={formData.certificateURL} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                                                            View current file
                                                        </a>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="text-xs text-zinc-500 hover:text-zinc-800 font-medium underline px-2 py-1"
                                                >
                                                    Change
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                onDragEnter={handleDrag}
                                                onDragLeave={handleDrag}
                                                onDragOver={handleDrag}
                                                onDrop={handleDrop}
                                                onClick={() => fileInputRef.current?.click()}
                                                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${dragActive
                                                    ? "border-primary bg-primary/5"
                                                    : "border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300"
                                                    }`}
                                            >
                                                <UploadCloud className="w-8 h-8 text-zinc-400 mb-2" />
                                                <p className="text-sm font-medium text-zinc-700">
                                                    Click to upload or drag & drop
                                                </p>
                                                <p className="text-xs text-zinc-500 mt-1">
                                                    SVG, PNG, JPG or PDF (max 5MB)
                                                </p>
                                            </div>
                                        )}
                                        {errors.file && (
                                            <p className="text-xs text-red-500 mt-1">{errors.file}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-zinc-100 flex justify-end gap-3 bg-white rounded-b-xl">
                                <Button variant="outline" onClick={onClose} className="cursor-pointer">
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} className="cursor-pointer">
                                    {initialData ? "Save Changes" : "Add Skill"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
