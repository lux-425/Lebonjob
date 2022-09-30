import os


def validate_file_extension(name):
    isValid = True

    ext = os.path.splitext(name)[1]  # Return of a tuple like ('file', '.jpg')
    valid_extensions = ['.pdf']

    if not ext.lower() in valid_extensions:
        isValid = False

    return isValid
