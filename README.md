# Google Hash Crypto 

The hash function used to create a websocket session `nbh` token in [Google Colab](https://colab.research.google.com). You can find the original `JavaScript` version inside `original.js`, and the `C` code used to build the `libgoogcrypto.so` library inside the `googcrypto` folder. You can compile the project using the `Makefile` with the `make` command. It will output the `libgoogcrypto.so` file that you can then use with Python like so :

```python
import ctypes
import json


GOOGCRYPTO = ctypes.CDLL("./libgoogcrypto.so")


def get_assign_nbh_token(notebook_id: str) -> str:
    file = [["fileId"], [notebook_id]]
    json_data = json.dumps(file, separators=(",", " "))
    c_json_data = json_data.encode("utf-8")

    GOOGCRYPTO.hash_json_file_object.argtypes = [ctypes.c_char_p]
    GOOGCRYPTO.hash_json_file_object.restype = ctypes.POINTER(ctypes.c_ubyte)

    GOOGCRYPTO.free_hash.argtypes = [ctypes.POINTER(ctypes.c_ubyte)]

    result = GOOGCRYPTO.hash_json_file_object(c_json_data)
    result_string = ctypes.string_at(result).decode("utf-8")

    GOOGCRYPTO.free_hash(result)

    return result_string

if __name__ == "__main__":
    import sys

    if sys.argv.__len__() < 2:
        print("You must pass the notebook ID.", file=sys.stderr)
        exit(1)
    notebook_id = sys.argv[1]
    print(get_assign_nbh_token(notebook_id=notebook_id))
```

# What's `nbh` token ?

<img alt="nbh example" src="data:image/png;base64,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" />

The `nbh` token is used in order to assign a web socket session to your google account which will allow you to execute your notebook cells.
