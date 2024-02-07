package Kyle.backend.exception;

public class PasswordTooShortException extends RuntimeException {
  public PasswordTooShortException(String message) {
    super(message);
  }
}
