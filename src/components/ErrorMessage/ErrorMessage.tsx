import { AlertCircle } from 'lucide-react';
import s from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ 
  message = "Упс! Щось пішло не так. Спробуйте перезавантажити сторінку." 
}: ErrorMessageProps) => {
  return (
    <div className={s.container}>
      <AlertCircle size={48} color="#e50914" />
      <p className={s.text}>{message}</p>
      <button className={s.button} onClick={() => window.location.reload()}>
        Оновити
      </button>
    </div>
  );
};

export default ErrorMessage;