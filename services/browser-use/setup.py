from setuptools import setup, find_packages

setup(
    name="browser_use",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "fastapi>=0.115.8",
        "uvicorn>=0.34.0",
        "python-dotenv>=1.0.1",
        "httpx>=0.27.2",
        "langchain-google-genai>=0.0.10",
        "playwright>=1.41.2",
        "openai>=1.10.0",
        "anthropic>=0.8.0",
        "pydantic>=2.0.0",
        "websockets>=11.0.0",
        "python-multipart>=0.0.6"
    ],
)
