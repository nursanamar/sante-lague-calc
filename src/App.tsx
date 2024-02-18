import { useEffect, useState } from "react"
import { PartyVote, calculateSeat } from "./utils/sainte-lague"
import { Button, Card, Container, Divider, Group, Input, List, Stack, Text } from "@mantine/core";
import { FieldArrayWithId, UseFieldArrayRemove, UseFormRegister, useFieldArray, useForm } from "react-hook-form";

type FormInput = {
  seatCount: number;
  votes: PartyVote[]
}

function App() {
  const { register, handleSubmit, control } = useForm<FormInput>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "votes"
  })

  const [result,setResult] = useState<PartyVote[]>([])


  useEffect(() => {
    append({
      name: "",
      count: 0
    })
  }, [])

  const onSubmit = (values: FormInput) => {
    const result = calculateSeat(values.votes,values.seatCount);
    result.sort((a,b) => (b.seat ?? 0) - (a.seat ?? 0))
    setResult(result);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group p={"sm"}>
          <Card padding="xl" shadow="sm">
            <Card.Section>
              <Text>Suara partai</Text>
            </Card.Section>
            <Card.Section>
              <Stack>
                <Stack>
                  {
                    fields.map((field, index) => {
                      return <VoteInput remove={remove} index={index} key={field.id} field={field} register={register} />
                    })
                  }
                </Stack>
                <Button
                  onClick={() => {
                    append({
                      name: "",
                      count: 0
                    })
                  }}
                >Tambah Partai</Button>
              </Stack>
            </Card.Section>
            <Divider />
            <Card.Section mt={"xl"}>
              <Text>Jumlah kursi dapil</Text>
              <Stack>
                <Input type="number" placeholder="Jumlah Kursi" {...register("seatCount")} />
                <Button type="submit">Hitung</Button>
              </Stack>
            </Card.Section>
          </Card>
        </Group>
      </form>
      <Stack>
        <Text>Pembagian Kursi</Text>
        <List>
          {
            result.map((party,index) => {
              return (
                <List.Item key={index}>{`${party.name}, Jumlah suara: ${party.count}, Perolehan kursi: ${party.seat} kursi`}</List.Item>
              )
            })
          }
        </List>
      </Stack>
    </Container>
  )
}


type VoteInputProps = {
  field: FieldArrayWithId<FormInput, "votes", "id">,
  register: UseFormRegister<FormInput>,
  index: number;
  remove: UseFieldArrayRemove;
}

function VoteInput({ register, index, remove }: VoteInputProps) {
  return (
    <Group>
      <Input type="number" {...register(`votes.${index}.name`)} placeholder="Nama Partai" />
      <Input type="number" {...register(`votes.${index}.count`)} placeholder="Jumlah Suara" />
      <Button onClick={() => remove(index)} size="sm" color="red">Hapus</Button>
    </Group>
  )
}

export default App
