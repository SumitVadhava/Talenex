import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from './ui/Primitives';
import { Plus, X, Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillsEditModal } from './SkillsEditModal';
import { Button } from "@/components/ui/button";

export const SkillsSection = ({
  offered,
  wanted,
  isEditing = false,
  onUpdateOffered,
  onUpdateWanted
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('offered'); // 'offered' | 'wanted'
  const [editingSkill, setEditingSkill] = useState(null);

  const handleRemove = (id, type) => {
    if (type === 'offered' && onUpdateOffered) {
      onUpdateOffered(offered.filter(s => s.id !== id));
    } else if (type === 'wanted' && onUpdateWanted) {
      onUpdateWanted(wanted.filter(s => s.id !== id));
    }
  };

  const handleOpenModal = (type, skill = null) => {
    setModalType(type);
    setEditingSkill(skill);
    setModalOpen(true);
  };

  const handleSaveSkill = (data) => {
    const isUpdate = !!editingSkill;
    const type = modalType;

    if (type === 'offered') {
      let newOffered = [...offered];
      if (isUpdate) {
        newOffered = newOffered.map(s => s.id === editingSkill.id ? { ...s, ...data } : s);
      } else {
        newOffered.push({ ...data, id: Date.now().toString() });
      }
      onUpdateOffered(newOffered);
    } else {
      let newWanted = [...wanted];
      if (isUpdate) {
        newWanted = newWanted.map(s => s.id === editingSkill.id ? { ...s, ...data } : s);
      } else {
        newWanted.push({ ...data, id: Date.now().toString() });
      }
      onUpdateWanted(newWanted);
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Offered Skills */}
        <Card className="h-full border-l-4 border-l-emerald-500 flex flex-col">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                Skills Offered
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Expertise you can teach or trade.</p>
            </div>
            {isEditing && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleOpenModal('offered')}
                className="h-8 gap-1"
              >
                <Plus size={14} /> Add
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {offered.map((skill) => (
                  <motion.div
                    key={skill.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Badge variant="secondary" className="pl-3 pr-2 py-1.5 text-sm bg-emerald-50 text-emerald-700 border-emerald-100 flex items-center gap-2">
                      <span>
                        {skill.name || skill.title}
                        <span className="ml-1 opacity-60 text-xs font-normal">| {skill.level}</span>
                      </span>
                      {isEditing && (
                        <div className="flex items-center gap-1 ml-1 border-l border-emerald-200 pl-2">
                          <button
                            onClick={() => handleOpenModal('offered', skill)}
                            className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors text-emerald-600"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={() => handleRemove(skill.id, 'offered')}
                            className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors text-emerald-600"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      )}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
              {offered.length === 0 && !isEditing && (
                <p className="text-sm text-muted-foreground italic">No skills offered yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Wanted Skills */}
        <Card className="h-full border-l-4 border-l-pink-500 flex flex-col">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-pink-500" />
                Skills Wanted
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Skills you are interested in learning.</p>
            </div>
            {isEditing && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleOpenModal('wanted')}
                className="h-8 gap-1"
              >
                <Plus size={14} /> Add
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {wanted.map((skill) => (
                  <motion.div
                    key={skill.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Badge variant="secondary" className="pl-3 pr-2 py-1.5 text-sm bg-pink-50 text-pink-700 border-pink-100 flex items-center gap-2">
                      <span>
                        {skill.name}
                        <span className="ml-1 opacity-60 text-xs font-normal">| {skill.level}</span>
                      </span>
                      {isEditing && (
                        <div className="flex items-center gap-1 ml-1 border-l border-pink-200 pl-2">
                          <button
                            onClick={() => handleOpenModal('wanted', skill)}
                            className="hover:bg-pink-200 rounded-full p-0.5 transition-colors text-pink-600"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={() => handleRemove(skill.id, 'wanted')}
                            className="hover:bg-pink-200 rounded-full p-0.5 transition-colors text-pink-600"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      )}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
              {wanted.length === 0 && !isEditing && (
                <p className="text-sm text-muted-foreground italic">No skills wanted yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <SkillsEditModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          type={modalType}
          initialData={editingSkill}
          onSave={handleSaveSkill}
        />
      </div>
    </>
  );
};