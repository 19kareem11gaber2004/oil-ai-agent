from app.rag.service import rag_service


def main():
    question = "What about the temperature?"

    answer = rag_service.ask(question)

    print(answer)


if __name__ == "__main__":
    main()