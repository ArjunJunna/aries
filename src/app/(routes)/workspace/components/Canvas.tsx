type DocumentEditorProps = {
  onTriggerSave: boolean;
  fileData: File;
};

type File = {
  id: string;
  name: string;
  author: string;
  teamId: string;
  archive: boolean;
  document: string;
  whiteboard: string;
  createdAt: Date;
};

const Canvas = ({ onTriggerSave,fileData }: DocumentEditorProps) => {
  return <div>Canvas</div>;
};

export default Canvas;
